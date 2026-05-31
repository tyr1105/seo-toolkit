// Redirect Checker
(function() {
  const page = document.getElementById('page-redirect-checker');
  page.innerHTML = `
    <button class="back-btn" data-page="home">← 返回首页</button>
    <div class="tool-header"><span style="font-size:1.8rem">🔀</span><h2>重定向检查器</h2></div>
    <p class="tool-description">检查URL的重定向链，查看HTTP状态码和最终目标地址。</p>

    <div class="card" style="margin-bottom:1rem; background: rgba(245,158,11,0.1); border-color: rgba(245,158,11,0.3);">
      <div style="display:flex;align-items:flex-start;gap:0.75rem;">
        <span style="font-size:1.3rem;">⚠️</span>
        <div>
          <strong style="color:#fbbf24;">注意</strong>
          <p style="font-size:0.85rem;color:var(--text-muted);margin-top:0.25rem;">
            由于浏览器CORS安全策略限制，直接在浏览器中检查某些URL可能无法获取完整的重定向链。
            建议配合使用以下工具：
          </p>
          <ul style="font-size:0.85rem;color:var(--text-muted);padding-left:1.2rem;margin-top:0.5rem;">
            <li>浏览器开发者工具 → Network标签 → 勾选"Preserve log"</li>
            <li><a href="https://httpstatus.io/" target="_blank" style="color:var(--primary);">httpstatus.io</a></li>
            <li><a href="https://www.redirect-checker.org/" target="_blank" style="color:var(--primary);">redirect-checker.org</a></li>
            <li>命令行：<code style="background:var(--bg);padding:0.1rem 0.3rem;border-radius:3px;">curl -L -I URL</code></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>🔍 输入URL</h3>
      <div style="display:flex;gap:0.5rem;">
        <input type="url" id="rc-url" placeholder="https://example.com" style="flex:1;">
        <button class="btn btn-primary" onclick="rcCheck()" id="rc-check-btn">🔍 检查</button>
      </div>
    </div>

    <div id="rc-results" style="display:none;">
      <div class="card" style="margin-top:1rem;">
        <h3>🔗 重定向链</h3>
        <div class="redirect-chain" id="rc-chain"></div>
      </div>

      <div class="card" style="margin-top:1rem;">
        <h3>📊 检查结果</h3>
        <div class="stats-bar" id="rc-stats"></div>
      </div>

      <div class="card" style="margin-top:1rem;">
        <h3>📋 详细信息</h3>
        <div class="code-output" id="rc-detail"></div>
      </div>
    </div>

    <div class="card" style="margin-top:1rem;">
      <h3>📖 如何手动检查重定向</h3>
      <div style="font-size:0.9rem;color:var(--text-muted);line-height:1.8;">
        <p><strong style="color:var(--text);">方法1：使用浏览器开发者工具</strong></p>
        <ol style="padding-left:1.2rem;margin-bottom:1rem;">
          <li>按 F12 打开开发者工具</li>
          <li>切换到 "Network" (网络) 标签</li>
          <li>勾选 "Preserve log" (保留日志)</li>
          <li>在地址栏输入URL并访问</li>
          <li>查看Network面板中的请求，301/302表示重定向</li>
        </ol>
        <p><strong style="color:var(--text);">方法2：使用curl命令</strong></p>
        <div class="code-output" style="margin-top:0.5rem;">curl -L -v -o /dev/null https://example.com 2>&1 | grep -E "< HTTP|< Location"</div>
        <p><strong style="color:var(--text);margin-top:1rem;display:block;">常见的HTTP状态码</strong></p>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.5rem;">
          <span class="tag tag-green">200 成功</span>
          <span class="tag tag-yellow">301 永久重定向</span>
          <span class="tag tag-blue">302 临时重定向</span>
          <span class="tag tag-yellow">303 See Other</span>
          <span class="tag tag-blue">307 临时重定向</span>
          <span class="tag tag-yellow">308 永久重定向</span>
          <span class="tag tag-red">404 未找到</span>
          <span class="tag tag-red">500 服务器错误</span>
        </div>
      </div>
    </div>
  `;

  window.rcCheck = async function() {
    const url = document.getElementById('rc-url').value.trim();
    if (!url) return showToast('请输入URL');

    // Validate URL
    try { new URL(url); } catch(e) { return showToast('请输入有效的URL'); }

    const btn = document.getElementById('rc-check-btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> 检查中...';

    const chain = [];
    let currentUrl = url;
    let maxRedirects = 10;
    let finalStatus = 0;
    let error = null;

    try {
      // Try to fetch with redirect: manual to catch redirects
      let redirectCount = 0;
      while (redirectCount < maxRedirects) {
        try {
          const response = await fetch(currentUrl, {
            method: 'HEAD',
            redirect: 'manual',
            mode: 'no-cors'
          });

          // In no-cors mode, response.status is 0 for opaque responses
          // We can't read Location header, so this is limited
          const status = response.status;
          const statusText = response.statusText;
          
          if (status === 0) {
            // Opaque response - CORS blocked
            chain.push({ url: currentUrl, status: 0, statusText: 'CORS受限 (Opaque Response)', type: 'blocked' });
            break;
          }

          chain.push({ url: currentUrl, status, statusText: response.statusText || getStatusText(status), type: getStatusType(status) });

          if (status >= 300 && status < 400) {
            const location = response.headers.get('Location');
            if (location) {
              currentUrl = new URL(location, currentUrl).href;
              redirectCount++;
            } else {
              break;
            }
          } else {
            finalStatus = status;
            break;
          }
        } catch (fetchErr) {
          chain.push({ url: currentUrl, status: 0, statusText: '网络错误: ' + fetchErr.message, type: 'error' });
          error = fetchErr.message;
          break;
        }
      }
    } catch (e) {
      error = e.message;
    }

    // If chain is empty (likely CORS), add the initial URL
    if (chain.length === 0) {
      chain.push({ url, status: 0, statusText: '无法访问 (可能由于CORS限制)', type: 'blocked' });
    }

    // Render results
    document.getElementById('rc-results').style.display = 'block';

    const chainContainer = document.getElementById('rc-chain');
    chainContainer.innerHTML = chain.map((step, i) => {
      let html = `<div class="redirect-step">
        <span class="status-badge status-${step.type}">${step.status || '?'}</span>
        <div style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${escapeHtml(step.url)}">${escapeHtml(step.url)}</div>
        <span style="font-size:0.8rem;color:var(--text-muted);">${step.statusText}</span>
      </div>`;
      if (i < chain.length - 1) html += '<div class="redirect-arrow"></div>';
      return html;
    }).join('');

    // Stats
    const statsBar = document.getElementById('rc-stats');
    const redirectCount = chain.filter(s => s.status >= 300 && s.status < 400).length;
    statsBar.innerHTML = `
      <div class="stat-pill">跳转次数 <span class="num">${redirectCount}</span></div>
      <div class="stat-pill">最终状态 <span class="num">${chain[chain.length-1].status || 'N/A'}</span></div>
      <div class="stat-pill">目标 <span class="num" style="font-size:0.7rem;max-width:200px;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(chain[chain.length-1].url)}</span></div>
    `;

    // Detail
    const detail = document.getElementById('rc-detail');
    detail.textContent = chain.map((s, i) => `[${i+1}] ${s.status || 'N/A'} ${s.statusText}\n    URL: ${s.url}`).join('\n\n');

    btn.disabled = false;
    btn.innerHTML = '🔍 检查';
  };

  function getStatusText(code) {
    const texts = { 200:'OK', 301:'Moved Permanently', 302:'Found', 303:'See Other', 307:'Temporary Redirect', 308:'Permanent Redirect', 404:'Not Found', 500:'Internal Server Error' };
    return texts[code] || '';
  }

  function getStatusType(code) {
    if (code >= 200 && code < 300) return '200';
    if (code === 301 || code === 308) return '301';
    if (code === 302 || code === 303 || code === 307) return '302';
    if (code === 404) return '404';
    return '301';
  }

  function escapeHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  // Allow Enter key
  document.getElementById('rc-url').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') rcCheck();
  });
})();
