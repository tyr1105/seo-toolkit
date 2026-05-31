// Robots.txt Generator
(function() {
  const page = document.getElementById('page-robots-txt-generator');
  let rules = [];

  page.innerHTML = `
    <button class="back-btn" data-page="home">← 返回首页</button>
    <div class="tool-header"><span style="font-size:1.8rem">🤖</span><h2>Robots.txt生成器</h2></div>
    <p class="tool-description">生成标准的robots.txt文件，控制搜索引擎爬虫的访问规则。支持多User-agent和多种常用模板。</p>

    <div class="form-row">
      <div style="flex:1">
        <div class="card">
          <h3>⚡ 快速模板</h3>
          <div class="template-btns">
            <button class="btn btn-secondary btn-sm" onclick="rbTemplate('allow-all')">✅ 允许所有</button>
            <button class="btn btn-secondary btn-sm" onclick="rbTemplate('block-all')">🚫 屏蔽所有</button>
            <button class="btn btn-secondary btn-sm" onclick="rbTemplate('block-admin')">🔒 屏蔽后台</button>
            <button class="btn btn-secondary btn-sm" onclick="rbTemplate('wordpress')">📝 WordPress</button>
          </div>
        </div>

        <div class="card">
          <h3>⚙️ 添加规则组</h3>
          <div class="form-group">
            <label>User-agent</label>
            <select id="rb-useragent">
              <option value="*">* (所有爬虫)</option>
              <option value="Googlebot">Googlebot</option>
              <option value="Bingbot">Bingbot</option>
              <option value="Slurp">Slurp (Yahoo)</option>
              <option value="DuckDuckBot">DuckDuckBot</option>
              <option value="Baiduspider">Baiduspider</option>
              <option value="YandexBot">YandexBot</option>
              <option value="facebot">Facebot</option>
              <option value="ia_archiver">ia_archiver (Alexa)</option>
            </select>
          </div>
          <div id="rb-rules-list"></div>
          <button class="btn btn-secondary btn-sm" onclick="rbAddRule()" style="margin-bottom:1rem;">➕ 添加规则</button>
          <div class="form-group">
            <label>Crawl-delay (秒)</label>
            <input type="number" id="rb-crawl-delay" placeholder="留空不设置" min="0">
          </div>
          <button class="btn btn-primary" onclick="rbAddGroup()">➕ 添加规则组</button>
        </div>

        <div class="card">
          <h3>🗺️ Sitemap</h3>
          <div class="form-group">
            <label>Sitemap URL</label>
            <input type="url" id="rb-sitemap" placeholder="https://example.com/sitemap.xml">
          </div>
        </div>
      </div>

      <div style="flex:1">
        <div class="card">
          <h3>📋 规则组列表</h3>
          <div id="rb-groups-list">
            <div style="text-align:center;color:var(--text-muted);padding:2rem;">暂无规则组，请添加或选择模板</div>
          </div>
        </div>

        <div class="card" style="position:relative;">
          <h3>📋 生成的robots.txt</h3>
          <div class="code-output" id="rb-output" style="position:relative;">
            <button class="copy-btn" onclick="copyText(document.getElementById('rb-output').textContent.replace('复制','').trim(), this)">复制</button>
          </div>
          <div class="btn-group">
            <button class="btn btn-primary" onclick="rbGenerate()">🔄 生成</button>
            <button class="btn btn-secondary" onclick="rbCopy()">📋 复制</button>
            <button class="btn btn-success" onclick="rbDownload()">⬇️ 下载robots.txt</button>
          </div>
        </div>
      </div>
    </div>
  `;

  let groups = [];
  let currentRules = [];

  window.rbAddRule = function() {
    currentRules.push({ type: 'Disallow', path: '' });
    renderCurrentRules();
  };

  window.rbRemoveRule = function(index) {
    currentRules.splice(index, 1);
    renderCurrentRules();
  };

  function renderCurrentRules() {
    const container = document.getElementById('rb-rules-list');
    container.innerHTML = currentRules.map((r, i) => `
      <div class="rule-item">
        <select onchange="currentRules[${i}].type=this.value">
          <option value="Allow" ${r.type==='Allow'?'selected':''}>Allow</option>
          <option value="Disallow" ${r.type==='Disallow'?'selected':''}>Disallow</option>
        </select>
        <input type="text" value="${escapeHtml(r.path)}" placeholder="/path/" onchange="currentRules[${i}].path=this.value">
        <button class="btn btn-danger btn-sm" onclick="rbRemoveRule(${i})">✕</button>
      </div>
    `).join('');
  };

  window.rbAddGroup = function() {
    const userAgent = document.getElementById('rb-useragent').value;
    const crawlDelay = document.getElementById('rb-crawl-delay').value;
    const rules = [...currentRules];
    
    if (rules.length === 0 && !crawlDelay) {
      rules.push({ type: 'Disallow', path: '' });
    }
    
    groups.push({ userAgent, rules, crawlDelay });
    currentRules = [];
    document.getElementById('rb-crawl-delay').value = '';
    renderCurrentRules();
    renderGroups();
    rbGenerate();
  };

  window.rbRemoveGroup = function(index) {
    groups.splice(index, 1);
    renderGroups();
    rbGenerate();
  };

  function renderGroups() {
    const container = document.getElementById('rb-groups-list');
    if (groups.length === 0) {
      container.innerHTML = '<div style="text-align:center;color:var(--text-muted);padding:2rem;">暂无规则组</div>';
      return;
    }
    container.innerHTML = groups.map((g, i) => `
      <div class="card" style="margin-bottom:0.75rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
          <span class="tag tag-blue">User-agent: ${g.userAgent}</span>
          <button class="btn btn-danger btn-sm" onclick="rbRemoveGroup(${i})">✕</button>
        </div>
        ${g.rules.map(r => `<div style="font-size:0.85rem;color:var(--text-muted);padding:0.15rem 0;">${r.type}: ${r.path || '(空 = 全部)'}</div>`).join('')}
        ${g.crawlDelay ? `<div style="font-size:0.85rem;color:var(--text-muted);">Crawl-delay: ${g.crawlDelay}</div>` : ''}
      </div>
    `).join('');
  }

  window.rbTemplate = function(type) {
    groups = [];
    if (type === 'allow-all') {
      groups.push({ userAgent: '*', rules: [{ type: 'Disallow', path: '' }], crawlDelay: '' });
    } else if (type === 'block-all') {
      groups.push({ userAgent: '*', rules: [{ type: 'Disallow', path: '/' }], crawlDelay: '' });
    } else if (type === 'block-admin') {
      groups.push({ userAgent: '*', rules: [
        { type: 'Allow', path: '/' },
        { type: 'Disallow', path: '/admin/' },
        { type: 'Disallow', path: '/login/' }
      ], crawlDelay: '' });
    } else if (type === 'wordpress') {
      groups.push({ userAgent: '*', rules: [
        { type: 'Disallow', path: '/wp-admin/' },
        { type: 'Allow', path: '/wp-admin/admin-ajax.php' },
        { type: 'Disallow', path: '/wp-includes/' },
        { type: 'Disallow', path: '/trackback/' },
        { type: 'Disallow', path: '/?s=' }
      ], crawlDelay: '' });
    }
    renderGroups();
    rbGenerate();
    showToast('已加载模板');
  };

  window.rbGenerate = function() {
    const sitemap = document.getElementById('rb-sitemap').value.trim();
    let txt = '';
    
    groups.forEach(g => {
      txt += `User-agent: ${g.userAgent}\n`;
      g.rules.forEach(r => {
        txt += `${r.type}: ${r.path}\n`;
      });
      if (g.crawlDelay) txt += `Crawl-delay: ${g.crawlDelay}\n`;
      txt += '\n';
    });
    
    if (sitemap) txt += `Sitemap: ${sitemap}\n`;
    
    const output = document.getElementById('rb-output');
    output.textContent = txt.trim() || '添加规则后将在此生成robots.txt';
  };

  window.rbCopy = function() {
    copyText(document.getElementById('rb-output').textContent.trim());
  };

  window.rbDownload = function() {
    downloadFile('robots.txt', document.getElementById('rb-output').textContent.trim(), 'text/plain');
  };

  function escapeHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
})();
