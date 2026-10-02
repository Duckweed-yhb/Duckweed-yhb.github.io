# 校验构建专用插件（只在 --config _config.yml,_config_verify.yml 时加载）
#
# 处理对象：minima 主题自带的 assets/main.scss
#
# 为什么必须处理它：
#   该文件需要 sass-embedded 启动子进程并用管道通信，在本机沙箱内报
#   `IO.pipe: Permission denied (Errno::EACCES)`，导致 jekyll build 中断。
#   而它站点从未引用 —— _layouts/default.html 只加载 assets/css/*.css，
#   站内所有页面/文章都用本仓库 _layouts/ 下的 default 与 post 布局。
#
# 做了两件事：
#   1. 让 SCSS 转换器对任何扩展名都不匹配，它便不再被编译；
#   2. 在 post_read 阶段把该文件从 pages / static_files 里摘掉，
#      避免它作为「页面」在产出目录里生成一个多余的 /main/ 页面。
#
# 该目录名以点开头、且不在默认 plugins_dir（_plugins）中，
# 正常 `jekyll build` 与 GitHub Pages 构建都不会加载它。

Jekyll::Converters::Scss.class_eval do
  def matches(_ext)
    false
  end

  def output_ext(_ext)
    ".css"
  end
end

Jekyll::Hooks.register :site, :post_read do |site|
  target = "assets/main.scss"

  site.pages.reject! { |page| page.relative_path.to_s.tr("\\", "/").end_with?(target) }
  site.static_files.reject! { |file| file.relative_path.to_s.tr("\\", "/").end_with?(target) }
end
