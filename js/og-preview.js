// Open Graph Preview
(function() {
  const page = document.getElementById('page-og-preview');
  page.innerHTML = `
    <button class="back-btn" data-page="home">← 返回首页</button>
    <div class="tool-header"><span style="font-size:1.8rem">🔗</span><h2>OG预览工具</h2></div>
    <p class="tool-description">预览网页在Facebook、Twitter/X、LinkedIn和Slack中的分享效果。优化你的Open Graph标签以提升社交媒体点击率。</p>

    <div class="form-row">
      <div style="flex:1">
        <div class="card">
          <h3>📝 Open Graph 设置</h3>
          <div class="form-group">
            <label>og:title</label>
            <input type="text" id="og-title" placeholder="页面标题">
          </div>
          <div class="form-group">
            <label>og:description</label>
            <textarea id="og-desc" placeholder="页面描述" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>og:image (图片URL)</label>
            <input type="url" id="og-image" placeholder="https://example.com/image.jpg">
            <div class="hint">推荐尺寸：1200 x 630 像素，最小 600 x 315</div>
          </div>
          <div class="form-group">
            <label>og:url</label>
            <input type="url" id="og-url" placeholder="https://example.com/page">
          </div>
          <div class="form-group">
            <label>og:type</label>
            <select id="og-type">
              <option value="website">website</option>
              <option value="article">article</option>
              <option value="product">product</option>
            </select>
          </div>
          <div class="form-group">
            <label>网站名称</label>
            <input type="text" id="og-sitename" placeholder="My Website">
          </div>
        </div>

        <div class="card" style="position:relative;">
          <h3>📋 OG Meta标签</h3>
          <div class="code-output" id="og-output" style="position:relative;">
            <button class="copy-btn" onclick="copyOGTags(this)">复制</button>
          </div>
          <div class="btn-group">
            <button class="btn btn-primary" onclick="generateOGTags()">🔄 生成标签</button>
            <button class="btn btn-secondary" onclick="copyOGTags()">📋 复制全部</button>
          </div>
        </div>
      </div>

      <div style="flex:1">
        <div class="card">
          <h3>👁️ 社交平台预览</h3>
          <div class="og-preview-grid">
            <!-- Facebook -->
            <div class="social-card">
              <div class="sc-header">📘 Facebook</div>
              <div class="sc-image" id="og-fb-image">
                <span>1200 × 630</span>
              </div>
              <div class="sc-body">
                <div class="sc-domain" id="og-fb-domain">example.com</div>
                <div class="sc-title" id="og-fb-title">页面标题</div>
                <div class="sc-desc" id="og-fb-desc">页面描述将显示在这里</div>
              </div>
            </div>

            <!-- Twitter -->
            <div class="social-card">
              <div class="sc-header">🐦 Twitter / X</div>
              <div class="sc-image" id="og-tw-image">
                <span>1200 × 628</span>
              </div>
              <div class="sc-body">
                <div class="sc-domain" id="og-tw-domain">example.com</div>
                <div class="sc-title" id="og-tw-title">页面标题</div>
                <div class="sc-desc" id="og-tw-desc">页面描述将显示在这里</div>
              </div>
            </div>

            <!-- LinkedIn -->
            <div class="social-card">
              <div class="sc-header">💼 LinkedIn</div>
              <div class="sc-image" id="og-li-image">
                <span>1200 × 627</span>
              </div>
              <div class="sc-body">
                <div class="sc-domain" id="og-li-domain">example.com</div>
                <div class="sc-title" id="og-li-title">页面标题</div>
                <div class="sc-desc" id="og-li-desc">页面描述将显示在这里</div>
              </div>
            </div>

            <!-- Slack -->
            <div class="social-card">
              <div class="sc-header">💬 Slack</div>
              <div class="sc-body" style="padding:1rem;">
                <div class="slack-card">
                  <div class="sc-domain" id="og-sl-domain">example.com</div>
                  <div class="sc-title" id="og-sl-title">页面标题</div>
                  <div class="sc-desc" id="og-sl-desc">页面描述将显示在这里</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <h3>💡 图片建议</h3>
          <ul style="list-style:none;font-size:0.85rem;color:var(--text-muted);">
            <li style="padding:0.3rem 0;">📏 推荐尺寸：<strong style="color:var(--text)">1200 x 630 像素</strong></li>
            <li style="padding:0.3rem 0;">📏 最小尺寸：600 x 315 像素</li>
            <li style="padding:0.3rem 0;">📦 文件大小：不超过 5MB</li>
            <li style="padding:0.3rem 0;">🖼️ 格式：JPG、PNG 或 GIF</li>
            <li style="padding:0.3rem 0;">⚠️ 标题文字建议不超过图片面积的 20%</li>
          </ul>
        </div>
      </div>
    </div>
  `;

  // Live update
  const inputs = ['og-title', 'og-desc', 'og-image', 'og-url', 'og-type', 'og-sitename'];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', updatePreviews);
  });

  function updatePreviews() {
    const title = document.getElementById('og-title').value || '页面标题';
    const desc = document.getElementById('og-desc').value || '页面描述将显示在这里';
    const image = document.getElementById('og-image').value;
    const url = document.getElementById('og-url').value || 'https://example.com';
    let domain = 'example.com';
    try { domain = new URL(url).hostname; } catch(e) {}

    // Update all previews
    ['fb', 'tw', 'li'].forEach(platform => {
      document.getElementById(`og-${platform}-title`).textContent = title;
      document.getElementById(`og-${platform}-desc`).textContent = desc;
      document.getElementById(`og-${platform}-domain`).textContent = domain;
      
      const imgContainer = document.getElementById(`og-${platform}-image`);
      if (image) {
        imgContainer.innerHTML = `<img src="${escapeHtml(image)}" alt="OG Image" onerror="this.parentElement.innerHTML='<span>图片加载失败</span>'">`;
      } else {
        imgContainer.innerHTML = '<span>1200 × 630</span>';
      }
    });

    // Slack (no image)
    document.getElementById('og-sl-title').textContent = title;
    document.getElementById('og-sl-desc').textContent = desc;
    document.getElementById('og-sl-domain').textContent = domain;

    generateOGTags();
  }

  function generateOGTags() {
    const title = document.getElementById('og-title').value;
    const desc = document.getElementById('og-desc').value;
    const image = document.getElementById('og-image').value;
    const url = document.getElementById('og-url').value;
    const type = document.getElementById('og-type').value;
    const sitename = document.getElementById('og-sitename').value;

    let tags = [];
    tags.push('<!-- Open Graph Meta Tags -->');
    tags.push(`<meta property="og:type" content="${type}">`);
    if (title) tags.push(`<meta property="og:title" content="${escapeHtml(title)}">`);
    if (desc) tags.push(`<meta property="og:description" content="${escapeHtml(desc)}">`);
    if (image) tags.push(`<meta property="og:image" content="${escapeHtml(image)}">`);
    if (url) tags.push(`<meta property="og:url" content="${escapeHtml(url)}">`);
    if (sitename) tags.push(`<meta property="og:site_name" content="${escapeHtml(sitename)}">`);
    
    tags.push('');
    tags.push('<!-- Twitter Card Meta Tags -->');
    tags.push(`<meta name="twitter:card" content="summary_large_image">`);
    if (title) tags.push(`<meta name="twitter:title" content="${escapeHtml(title)}">`);
    if (desc) tags.push(`<meta name="twitter:description" content="${escapeHtml(desc)}">`);
    if (image) tags.push(`<meta name="twitter:image" content="${escapeHtml(image)}">`);

    const output = document.getElementById('og-output');
    const oldBtn = output.querySelector('.copy-btn');
    output.textContent = tags.join('\n');
    if (oldBtn) {
      oldBtn.textContent = '复制';
      oldBtn.classList.remove('copied');
      output.appendChild(oldBtn);
    }
  }

  window.copyOGTags = function(btn) {
    const output = document.getElementById('og-output');
    const text = output.textContent.replace('复制', '').replace('✓ 已复制', '').trim();
    copyText(text, btn);
  };

  function escapeHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
})();
