// SEO Toolkit - Main Application
(function() {
  'use strict';

  const tools = [
    { id: 'meta-tag-generator', name: 'Meta标签生成器', icon: '🏷️', desc: '生成完整的HTML meta标签，包括Open Graph和Twitter Card' },
    { id: 'sitemap-generator', name: 'Sitemap生成器', icon: '🗺️', desc: '创建标准XML网站地图，支持批量添加URL' },
    { id: 'robots-txt-generator', name: 'Robots.txt生成器', icon: '🤖', desc: '生成robots.txt文件，控制搜索引擎爬虫行为' },
    { id: 'heading-analyzer', name: '标题结构分析器', icon: '📊', desc: '分析页面的H1-H6标题层级结构，发现SEO问题' },
    { id: 'word-counter', name: '字数统计工具', icon: '📝', desc: '统计字数、句数、阅读时间、关键词密度' },
    { id: 'og-preview', name: 'OG预览工具', icon: '🔗', desc: '预览网页在Facebook、Twitter、LinkedIn的分享效果' },
    { id: 'schema-generator', name: 'Schema.org生成器', icon: '📋', desc: '生成JSON-LD结构化数据，提升搜索结果展示' },
    { id: 'redirect-checker', name: '重定向检查器', icon: '🔀', desc: '检查URL重定向链，查看状态码和最终目标' },
  ];

  let currentPage = 'home';

  function init() {
    renderSidebar();
    renderLandingPage();
    bindNavigation();
    bindFaq();
    bindSearch();
    showPage('home');
  }

  function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    let html = '<div class="sidebar-section">SEO 工具</div>';
    tools.forEach(t => {
      html += `<div class="nav-item" data-page="${t.id}"><span class="nav-icon">${t.icon}</span>${t.name}</div>`;
    });
    html += '<div class="sidebar-section" style="margin-top:1.5rem">其他</div>';
    html += '<div class="nav-item" data-page="home"><span class="nav-icon">🏠</span>首页</div>';
    sidebar.innerHTML = html;
  }

  function renderLandingPage() {
    const landing = document.getElementById('page-home');
    let cardsHtml = '';
    tools.forEach(t => {
      cardsHtml += `
        <div class="tool-card" data-page="${t.id}">
          <div class="tool-card-icon">${t.icon}</div>
          <h3>${t.name}</h3>
          <p>${t.desc}</p>
        </div>`;
    });

    landing.innerHTML = `
      <div class="hero">
        <h1>SEO Toolkit - 免费SEO工具集</h1>
        <p>一站式SEO优化工具，助力你的网站在搜索引擎中脱颖而出</p>
        <div class="hero-stats">
          <div class="stat-item"><div class="stat-num">8</div><div class="stat-label">免费SEO工具</div></div>
          <div class="stat-item"><div class="stat-num">100%</div><div class="stat-label">完全免费</div></div>
          <div class="stat-item"><div class="stat-num">0</div><div class="stat-label">需要注册</div></div>
        </div>
      </div>
      <div class="search-bar">
        <span class="search-icon">🔍</span>
        <input type="text" id="tool-search" placeholder="搜索工具...">
      </div>
      <div class="tools-grid" id="tools-grid">${cardsHtml}</div>

      <div class="premium-banner">
        <h3>🚀 升级到 Pro 版</h3>
        <p>批量分析、关键词追踪、竞品对比、自动化报告</p>
        <a href="#" class="premium-btn">了解更多</a>
      </div>

      <div class="faq-section">
        <h2>常见问题</h2>
        <div class="faq-item">
          <div class="faq-question">什么是Meta标签？为什么它们对SEO很重要？<span class="faq-arrow">▼</span></div>
          <div class="faq-answer">Meta标签是HTML头部的信息标签，向搜索引擎描述网页内容。Title标签和Meta Description直接影响搜索结果的展示，优化好可以提高点击率（CTR）。Open Graph标签则影响社交媒体分享时的展示效果。</div>
        </div>
        <div class="faq-item">
          <div class="faq-question">Sitemap.xml有什么作用？<span class="faq-arrow">▼</span></div>
          <div class="faq-answer">Sitemap.xml是一个XML文件，列出网站所有重要页面的URL，帮助搜索引擎更高效地发现和抓取你的网站内容。它还可以提供每个页面的更新频率、优先级和最后修改时间等信息。</div>
        </div>
        <div class="faq-item">
          <div class="faq-question">如何使用robots.txt优化网站爬取？<span class="faq-arrow">▼</span></div>
          <div class="faq-answer">robots.txt文件告诉搜索引擎爬虫哪些页面可以访问，哪些不可以。合理配置可以防止爬虫抓取重复内容、后台页面等，节省爬取配额，让搜索引擎更专注于重要内容。</div>
        </div>
        <div class="faq-item">
          <div class="faq-question">什么是Schema.org结构化数据？<span class="faq-arrow">▼</span></div>
          <div class="faq-answer">Schema.org结构化数据是一种标准化的格式，用于向搜索引擎提供页面的语义信息。使用JSON-LD格式添加结构化数据可以让你的网页在搜索结果中显示富媒体片段（Rich Snippets），如星级评分、价格、FAQ展开等。</div>
        </div>
        <div class="faq-item">
          <div class="faq-question">标题标签（H1-H6）如何影响SEO？<span class="faq-arrow">▼</span></div>
          <div class="faq-answer">标题标签帮助搜索引擎理解页面内容的层次结构。每个页面应该只有一个H1标签（主标题），然后使用H2-H6创建逻辑清晰的内容结构。跳过层级（如从H1直接到H3）会影响SEO效果。</div>
        </div>
        <div class="faq-item">
          <div class="faq-question">如何提升你的搜索排名？<span class="faq-arrow">▼</span></div>
          <div class="faq-answer">提升搜索排名需要综合考虑：1) 优化页面Title和Description；2) 创建高质量原创内容；3) 使用合理的标题结构；4) 添加结构化数据；5) 确保网站技术SEO基础（Sitemap、robots.txt、页面速度）；6) 建立高质量的外链。使用我们的免费工具可以快速完成前5项优化！</div>
        </div>
      </div>
    `;
  }

  function bindNavigation() {
    document.addEventListener('click', function(e) {
      const navItem = e.target.closest('[data-page]');
      if (navItem) {
        e.preventDefault();
        showPage(navItem.dataset.page);
      }
    });
  }

  function showPage(pageId) {
    currentPage = pageId;
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // Show target page
    const target = document.getElementById('page-' + pageId);
    if (target) {
      target.classList.add('active');
    }
    // Update sidebar active
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.page === pageId);
    });
    // Scroll to top
    document.querySelector('.content').scrollTop = 0;
    // Update title
    const tool = tools.find(t => t.id === pageId);
    document.title = tool ? `${tool.name} - SEO Toolkit` : 'SEO Toolkit - 免费SEO工具集';
  }

  function bindFaq() {
    document.addEventListener('click', function(e) {
      const q = e.target.closest('.faq-question');
      if (q) {
        const answer = q.nextElementSibling;
        const arrow = q.querySelector('.faq-arrow');
        answer.classList.toggle('open');
        arrow.classList.toggle('open');
      }
    });
  }

  function bindSearch() {
    document.addEventListener('input', function(e) {
      if (e.target.id === 'tool-search') {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.tool-card').forEach(card => {
          const text = card.textContent.toLowerCase();
          card.style.display = text.includes(query) ? '' : 'none';
        });
      }
    });
  }

  // Toast notification
  window.showToast = function(msg, duration) {
    duration = duration || 2000;
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  };

  // Copy to clipboard
  window.copyText = function(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
      if (btn) {
        btn.classList.add('copied');
        btn.textContent = '✓ 已复制';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.textContent = '复制';
        }, 2000);
      }
      showToast('已复制到剪贴板');
    });
  };

  // Download file
  window.downloadFile = function(filename, content, type) {
    type = type || 'text/plain';
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showToast('文件下载中...');
  };

  document.addEventListener('DOMContentLoaded', init);
})();
