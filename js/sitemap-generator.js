// Sitemap.xml Generator
(function() {
  const page = document.getElementById('page-sitemap-generator');
  let pages = [];

  page.innerHTML = `
    <button class="back-btn" data-page="home">← 返回首页</button>
    <div class="tool-header"><span style="font-size:1.8rem">🗺️</span><h2>Sitemap生成器</h2></div>
    <p class="tool-description">生成标准的XML网站地图文件。支持手动添加页面和批量导入URL。</p>

    <div class="form-row">
      <div style="flex:1">
        <div class="card">
          <h3>⚙️ 基本设置</h3>
          <div class="form-group">
            <label>网站基础URL</label>
            <input type="url" id="sm-base-url" placeholder="https://example.com">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>默认优先级</label>
              <select id="sm-default-priority">
                <option value="1.0">1.0 (最高)</option>
                <option value="0.9">0.9</option>
                <option value="0.8" selected>0.8</option>
                <option value="0.7">0.7</option>
                <option value="0.6">0.6</option>
                <option value="0.5">0.5 (中等)</option>
                <option value="0.4">0.4</option>
                <option value="0.3">0.3</option>
                <option value="0.2">0.2</option>
                <option value="0.1">0.1 (最低)</option>
              </select>
            </div>
            <div class="form-group">
              <label>默认更新频率</label>
              <select id="sm-default-changefreq">
                <option value="always">always</option>
                <option value="hourly">hourly</option>
                <option value="daily">daily</option>
                <option value="weekly" selected>weekly</option>
                <option value="monthly">monthly</option>
                <option value="yearly">yearly</option>
                <option value="never">never</option>
              </select>
            </div>
          </div>
        </div>

        <div class="card">
          <h3>➕ 添加页面</h3>
          <div class="tab-bar">
            <button class="tab-btn active" onclick="smSwitchTab('manual', this)">手动添加</button>
            <button class="tab-btn" onclick="smSwitchTab('bulk', this)">批量导入</button>
          </div>
          <div class="tab-content active" id="sm-tab-manual">
            <div class="form-group">
              <label>页面URL路径</label>
              <input type="text" id="sm-page-url" placeholder="/about-us 或完整URL">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>优先级</label>
                <select id="sm-page-priority">
                  <option value="">使用默认</option>
                  <option value="1.0">1.0</option>
                  <option value="0.9">0.9</option>
                  <option value="0.8">0.8</option>
                  <option value="0.7">0.7</option>
                  <option value="0.6">0.6</option>
                  <option value="0.5">0.5</option>
                  <option value="0.4">0.4</option>
                  <option value="0.3">0.3</option>
                  <option value="0.2">0.2</option>
                  <option value="0.1">0.1</option>
                </select>
              </div>
              <div class="form-group">
                <label>更新频率</label>
                <select id="sm-page-changefreq">
                  <option value="">使用默认</option>
                  <option value="always">always</option>
                  <option value="hourly">hourly</option>
                  <option value="daily">daily</option>
                  <option value="weekly">weekly</option>
                  <option value="monthly">monthly</option>
                  <option value="yearly">yearly</option>
                  <option value="never">never</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>最后修改日期</label>
              <input type="date" id="sm-page-lastmod">
            </div>
            <button class="btn btn-primary" onclick="smAddPage()">➕ 添加页面</button>
          </div>
          <div class="tab-content" id="sm-tab-bulk">
            <div class="form-group">
              <label>粘贴URL列表（每行一个）</label>
              <textarea id="sm-bulk-urls" rows="6" placeholder="/&#10;/about&#10;/services&#10;/blog&#10;/contact"></textarea>
            </div>
            <button class="btn btn-primary" onclick="smAddBulk()">📥 批量导入</button>
          </div>
        </div>
      </div>

      <div style="flex:1">
        <div class="card">
          <h3>📄 页面列表 <span id="sm-page-count" class="tag tag-blue" style="margin-left:0.5rem">0 页</span></h3>
          <div class="page-list" id="sm-page-list">
            <div style="text-align:center;color:var(--text-muted);padding:2rem;">暂无页面，请添加页面</div>
          </div>
          <div class="btn-group">
            <button class="btn btn-danger btn-sm" onclick="smClearAll()">🗑️ 清空列表</button>
          </div>
        </div>

        <div class="card" style="position:relative;">
          <h3>📋 生成的Sitemap.xml</h3>
          <div class="code-output" id="sm-output" style="position:relative;">
            <button class="copy-btn" onclick="copyText(document.getElementById('sm-output').textContent.replace('复制','').trim(), this)">复制</button>
          </div>
          <div class="btn-group">
            <button class="btn btn-primary" onclick="smGenerate()">🔄 生成Sitemap</button>
            <button class="btn btn-secondary" onclick="smCopy()">📋 复制</button>
            <button class="btn btn-success" onclick="smDownload()">⬇️ 下载sitemap.xml</button>
          </div>
        </div>
      </div>
    </div>
  `;

  window.smSwitchTab = function(tab, btn) {
    page.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    page.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('sm-tab-' + tab).classList.add('active');
  };

  window.smAddPage = function() {
    const url = document.getElementById('sm-page-url').value.trim();
    if (!url) return showToast('请输入页面URL');
    const baseUrl = document.getElementById('sm-base-url').value.trim().replace(/\/$/, '');
    const defaultPriority = document.getElementById('sm-default-priority').value;
    const defaultFreq = document.getElementById('sm-default-changefreq').value;
    
    let fullUrl = url;
    if (!url.startsWith('http') && baseUrl) fullUrl = baseUrl + (url.startsWith('/') ? '' : '/') + url;

    pages.push({
      url: fullUrl,
      priority: document.getElementById('sm-page-priority').value || defaultPriority,
      changefreq: document.getElementById('sm-page-changefreq').value || defaultFreq,
      lastmod: document.getElementById('sm-page-lastmod').value || ''
    });
    document.getElementById('sm-page-url').value = '';
    renderPages();
    smGenerate();
  };

  window.smAddBulk = function() {
    const text = document.getElementById('sm-bulk-urls').value.trim();
    if (!text) return showToast('请输入URL列表');
    const baseUrl = document.getElementById('sm-base-url').value.trim().replace(/\/$/, '');
    const defaultPriority = document.getElementById('sm-default-priority').value;
    const defaultFreq = document.getElementById('sm-default-changefreq').value;
    
    const urls = text.split('\n').map(u => u.trim()).filter(u => u);
    urls.forEach(url => {
      let fullUrl = url;
      if (!url.startsWith('http') && baseUrl) fullUrl = baseUrl + (url.startsWith('/') ? '' : '/') + url;
      pages.push({ url: fullUrl, priority: defaultPriority, changefreq: defaultFreq, lastmod: '' });
    });
    document.getElementById('sm-bulk-urls').value = '';
    renderPages();
    smGenerate();
    showToast(`已添加 ${urls.length} 个页面`);
  };

  window.smClearAll = function() {
    pages = [];
    renderPages();
    smGenerate();
  };

  function renderPages() {
    const list = document.getElementById('sm-page-list');
    document.getElementById('sm-page-count').textContent = pages.length + ' 页';
    if (pages.length === 0) {
      list.innerHTML = '<div style="text-align:center;color:var(--text-muted);padding:2rem;">暂无页面，请添加页面</div>';
      return;
    }
    list.innerHTML = pages.map((p, i) => `
      <div class="page-list-item">
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${escapeHtml(p.url)}">${escapeHtml(p.url)}</span>
        <span class="tag tag-blue">${p.priority}</span>
        <span class="tag tag-green">${p.changefreq}</span>
        <button class="btn btn-danger btn-sm" onclick="smRemovePage(${i})" style="padding:0.15rem 0.4rem;font-size:0.7rem;">✕</button>
      </div>
    `).join('');
  }

  window.smRemovePage = function(index) {
    pages.splice(index, 1);
    renderPages();
    smGenerate();
  };

  window.smGenerate = function() {
    const output = document.getElementById('sm-output');
    if (pages.length === 0) {
      output.textContent = '添加页面后将在此生成sitemap.xml';
      return;
    }
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    pages.forEach(p => {
      xml += '  <url>\n';
      xml += `    <loc>${escapeHtml(p.url)}</loc>\n`;
      if (p.lastmod) xml += `    <lastmod>${p.lastmod}</lastmod>\n`;
      if (p.changefreq) xml += `    <changefreq>${p.changefreq}</changefreq>\n`;
      if (p.priority) xml += `    <priority>${p.priority}</priority>\n`;
      xml += '  </url>\n';
    });
    xml += '</urlset>';
    output.textContent = xml;
  };

  window.smCopy = function() {
    copyText(document.getElementById('sm-output').textContent.trim());
  };

  window.smDownload = function() {
    downloadFile('sitemap.xml', document.getElementById('sm-output').textContent.trim(), 'application/xml');
  };

  function escapeHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
})();
