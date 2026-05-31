// Heading Structure Analyzer
(function() {
  const page = document.getElementById('page-heading-analyzer');
  page.innerHTML = `
    <button class="back-btn" data-page="home">← 返回首页</button>
    <div class="tool-header"><span style="font-size:1.8rem">📊</span><h2>标题结构分析器</h2></div>
    <p class="tool-description">分析HTML页面的标题标签（H1-H6）层级结构，检测SEO问题并给出优化建议。</p>

    <div class="card">
      <h3>📝 输入HTML代码</h3>
      <div class="form-group">
        <textarea id="ha-input" rows="10" placeholder="粘贴HTML代码，例如：&#10;<html>&#10;<body>&#10;  <h1>主标题</h1>&#10;  <h2>副标题1</h2>&#10;  <h3>小标题</h3>&#10;  <h2>副标题2</h2>&#10;</body>&#10;</html>"></textarea>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary" onclick="haAnalyze()">🔍 分析标题结构</button>
        <button class="btn btn-secondary" onclick="haLoadSample()">📄 加载示例</button>
        <button class="btn btn-secondary" onclick="document.getElementById('ha-input').value='';haClearResults()">🗑️ 清空</button>
      </div>
    </div>

    <div id="ha-results" style="display:none;">
      <div class="card" style="margin-top:1rem;">
        <h3>📊 标题统计</h3>
        <div class="stats-bar" id="ha-stats"></div>
      </div>

      <div class="form-row" style="margin-top:1rem;">
        <div class="card">
          <h3>🌳 标题层级树</h3>
          <div class="heading-tree" id="ha-tree"></div>
        </div>
        <div class="card">
          <h3>⚠️ 问题与建议</h3>
          <ul class="issues-list" id="ha-issues"></ul>
        </div>
      </div>
    </div>
  `;

  window.haAnalyze = function() {
    const html = document.getElementById('ha-input').value.trim();
    if (!html) return showToast('请输入HTML代码');

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    if (headings.length === 0) {
      showToast('未找到任何标题标签');
      return;
    }

    const data = [];
    const counts = { H1:0, H2:0, H3:0, H4:0, H5:0, H6:0 };

    headings.forEach(h => {
      const tag = h.tagName.toUpperCase();
      const level = parseInt(tag[1]);
      counts[tag]++;
      data.push({ tag, level, text: h.textContent.trim() || '(空)' });
    });

    // Stats
    const statsBar = document.getElementById('ha-stats');
    statsBar.innerHTML = Object.entries(counts)
      .filter(([_, v]) => v > 0)
      .map(([k, v]) => `<div class="stat-pill"><span class="num">${v}</span> ${k}</div>`)
      .join('') + `<div class="stat-pill"><span class="num">${data.length}</span> 总计</div>`;

    // Tree
    const tree = document.getElementById('ha-tree');
    const minLevel = Math.min(...data.map(d => d.level));
    tree.innerHTML = data.map(d => {
      const indent = d.level - minLevel;
      const color = d.tag === 'H1' ? 'var(--danger)' : d.tag === 'H2' ? 'var(--warning)' : 'var(--primary)';
      return `<div class="h-node h-indent-${Math.min(indent, 5)}">
        <span class="h-tag" style="color:${color}">${d.tag}</span>
        <span class="h-text">${escapeHtml(d.text)}</span>
      </div>`;
    }).join('');

    // Issues
    const issues = [];
    
    // Check H1
    if (counts.H1 === 0) issues.push({ type: 'error', msg: '❌ 缺少H1标签 — 每个页面应该有且仅有一个H1标签' });
    if (counts.H1 > 1) issues.push({ type: 'error', msg: `❌ 发现${counts.H1}个H1标签 — 建议每个页面只有一个H1` });
    if (counts.H1 === 1) issues.push({ type: 'success', msg: '✅ H1标签数量正确（1个）' });

    // Check skipped levels
    for (let i = 1; i < data.length; i++) {
      if (data[i].level > data[i-1].level + 1) {
        issues.push({ 
          type: 'warning', 
          msg: `⚠️ 标题层级跳跃：从${data[i-1].tag}("${truncate(data[i-1].text, 20)}")直接到${data[i].tag}("${truncate(data[i].text, 20)}")` 
        });
      }
    }

    // Check empty headings
    data.forEach(d => {
      if (d.text === '(空)') {
        issues.push({ type: 'warning', msg: `⚠️ ${d.tag}标签内容为空` });
      }
    });

    // Check very long headings
    data.forEach(d => {
      if (d.text.length > 70 && d.text !== '(空)') {
        issues.push({ type: 'warning', msg: `⚠️ ${d.tag}标签过长（${d.text.length}字符）："${truncate(d.text, 30)}"` });
      }
    });

    if (data.length > 0 && data[0].level !== 1 && counts.H1 > 0) {
      issues.push({ type: 'warning', msg: '⚠️ 页面第一个标题不是H1' });
    }

    if (counts.H2 > 0) issues.push({ type: 'success', msg: `✅ 使用了${counts.H2}个H2标签` });
    if (issues.filter(i => i.type === 'warning' || i.type === 'error').length === 0) {
      issues.push({ type: 'success', msg: '✅ 标题结构看起来不错！' });
    }

    const issuesList = document.getElementById('ha-issues');
    issuesList.innerHTML = issues.map(i => 
      `<li class="issue-${i.type === 'error' ? 'error' : i.type === 'warning' ? 'warning' : 'success'}">${i.msg}</li>`
    ).join('');

    document.getElementById('ha-results').style.display = 'block';
  };

  window.haLoadSample = function() {
    document.getElementById('ha-input').value = `<!DOCTYPE html>
<html>
<body>
  <h1>SEO优化完全指南</h1>
    <h2>什么是SEO？</h2>
      <h3>搜索引擎工作原理</h3>
      <h3>SEO的重要性</h3>
    <h2>站内SEO优化</h2>
      <h3>标题标签优化</h3>
      <h3>Meta描述优化</h3>
      <h3>内容优化</h3>
        <h4>关键词密度</h4>
        <h4>内容长度</h4>
      <h3>图片优化</h3>
    <h2>站外SEO优化</h2>
      <h3>外链建设</h3>
      <h3>社交媒体推广</h3>
    <h2>技术SEO</h2>
      <h3>网站速度</h3>
      <h3>移动端适配</h3>
      <h3>结构化数据</h3>
</body>
</html>`;
  };

  window.haClearResults = function() {
    document.getElementById('ha-results').style.display = 'none';
  };

  function escapeHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function truncate(s, n) { return s.length > n ? s.substring(0, n) + '...' : s; }
})();
