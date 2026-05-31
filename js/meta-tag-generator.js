// Meta Tag Generator
(function() {
  const page = document.getElementById('page-meta-tag-generator');
  page.innerHTML = `
    <button class="back-btn" data-page="home">← 返回首页</button>
    <div class="tool-header"><span style="font-size:1.8rem">🏷️</span><h2>Meta标签生成器</h2></div>
    <p class="tool-description">生成完整的HTML Meta标签，包括SEO基础标签、Open Graph和Twitter Card标签。实时预览Google搜索效果。</p>

    <div class="form-row">
      <div style="flex:1">
        <div class="card">
          <h3>📌 基础SEO标签</h3>
          <div class="form-group">
            <label>页面标题 (Title)</label>
            <input type="text" id="mt-title" placeholder="输入页面标题..." maxlength="100">
            <div class="char-count" id="mt-title-count">0/60</div>
          </div>
          <div class="form-group">
            <label>页面描述 (Meta Description)</label>
            <textarea id="mt-desc" placeholder="输入页面描述..." maxlength="300" rows="3"></textarea>
            <div class="char-count" id="mt-desc-count">0/160</div>
          </div>
          <div class="form-group">
            <label>关键词 (Keywords)</label>
            <input type="text" id="mt-keywords" placeholder="关键词1, 关键词2, 关键词3">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>作者</label>
              <input type="text" id="mt-author" placeholder="作者名称">
            </div>
            <div class="form-group">
              <label>Canonical URL</label>
              <input type="url" id="mt-canonical" placeholder="https://example.com/page">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Robots</label>
              <select id="mt-robots">
                <option value="index, follow">index, follow (默认)</option>
                <option value="noindex, follow">noindex, follow</option>
                <option value="index, nofollow">index, nofollow</option>
                <option value="noindex, nofollow">noindex, nofollow</option>
              </select>
            </div>
            <div class="form-group">
              <label>Viewport</label>
              <input type="text" id="mt-viewport" value="width=device-width, initial-scale=1.0">
            </div>
          </div>
        </div>

        <div class="card">
          <h3>📱 Open Graph 标签</h3>
          <div class="form-group">
            <label>og:type</label>
            <select id="mt-og-type">
              <option value="website">website</option>
              <option value="article">article</option>
              <option value="product">product</option>
              <option value="profile">profile</option>
              <option value="video.other">video</option>
            </select>
          </div>
          <div class="form-group">
            <label>og:title</label>
            <input type="text" id="mt-og-title" placeholder="留空则使用页面标题">
          </div>
          <div class="form-group">
            <label>og:description</label>
            <textarea id="mt-og-desc" placeholder="留空则使用页面描述" rows="2"></textarea>
          </div>
          <div class="form-group">
            <label>og:image</label>
            <input type="url" id="mt-og-image" placeholder="https://example.com/image.jpg">
            <div class="hint">推荐尺寸：1200 x 630 像素</div>
          </div>
          <div class="form-group">
            <label>og:url</label>
            <input type="url" id="mt-og-url" placeholder="https://example.com/page">
          </div>
        </div>

        <div class="card">
          <h3>🐦 Twitter Card 标签</h3>
          <div class="form-group">
            <label>twitter:card</label>
            <select id="mt-tw-card">
              <option value="summary_large_image">summary_large_image</option>
              <option value="summary">summary</option>
            </select>
          </div>
          <div class="form-group">
            <label>twitter:title</label>
            <input type="text" id="mt-tw-title" placeholder="留空则使用页面标题">
          </div>
          <div class="form-group">
            <label>twitter:description</label>
            <textarea id="mt-tw-desc" placeholder="留空则使用页面描述" rows="2"></textarea>
          </div>
          <div class="form-group">
            <label>twitter:image</label>
            <input type="url" id="mt-tw-image" placeholder="留空则使用og:image">
          </div>
        </div>
      </div>

      <div style="flex:1">
        <div class="card">
          <h3>🔍 Google搜索预览</h3>
          <div class="google-preview" id="mt-google-preview">
            <div class="gp-title">页面标题将显示在这里</div>
            <div class="gp-url">https://example.com</div>
            <div class="gp-desc">页面描述将显示在这里。在搜索结果中，Google通常会显示约155-160个字符的描述文本。</div>
          </div>
        </div>

        <div class="card" style="position:relative;">
          <h3>📋 生成的Meta标签</h3>
          <div class="code-output" id="mt-output" style="position:relative;">
            <button class="copy-btn" onclick="copyMetaTags(this)">复制</button>
            <!-- 填写表单后将在此生成meta标签 -->
          </div>
          <div class="btn-group">
            <button class="btn btn-primary" onclick="generateMetaTags()">🔄 生成Meta标签</button>
            <button class="btn btn-secondary" onclick="copyMetaTags()">📋 复制全部</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Live update
  const inputs = page.querySelectorAll('input, textarea, select');
  inputs.forEach(el => {
    el.addEventListener('input', () => { updateMetaPreview(); generateMetaTags(); });
    el.addEventListener('change', () => { updateMetaPreview(); generateMetaTags(); });
  });

  function updateMetaPreview() {
    const title = document.getElementById('mt-title').value || '页面标题将显示在这里';
    const desc = document.getElementById('mt-desc').value || '页面描述将显示在这里。';
    const url = document.getElementById('mt-canonical').value || document.getElementById('mt-og-url').value || 'https://example.com';
    
    const preview = document.getElementById('mt-google-preview');
    preview.querySelector('.gp-title').textContent = title;
    preview.querySelector('.gp-url').textContent = url;
    preview.querySelector('.gp-desc').textContent = desc.substring(0, 160) + (desc.length > 160 ? '...' : '');

    // Update char counts
    updateCharCount('mt-title-count', document.getElementById('mt-title').value.length, 60);
    updateCharCount('mt-desc-count', document.getElementById('mt-desc').value.length, 160);
  }

  function updateCharCount(id, current, max) {
    const el = document.getElementById(id);
    el.textContent = `${current}/${max}`;
    el.className = 'char-count';
    if (current === 0) el.classList.add('warn');
    else if (current <= max) el.classList.add('good');
    else el.classList.add('over');
  }

  window.generateMetaTags = function() {
    const title = document.getElementById('mt-title').value;
    const desc = document.getElementById('mt-desc').value;
    const keywords = document.getElementById('mt-keywords').value;
    const author = document.getElementById('mt-author').value;
    const canonical = document.getElementById('mt-canonical').value;
    const robots = document.getElementById('mt-robots').value;
    const viewport = document.getElementById('mt-viewport').value;

    const ogType = document.getElementById('mt-og-type').value;
    const ogTitle = document.getElementById('mt-og-title').value || title;
    const ogDesc = document.getElementById('mt-og-desc').value || desc;
    const ogImage = document.getElementById('mt-og-image').value;
    const ogUrl = document.getElementById('mt-og-url').value || canonical;

    const twCard = document.getElementById('mt-tw-card').value;
    const twTitle = document.getElementById('mt-tw-title').value || title;
    const twDesc = document.getElementById('mt-tw-desc').value || desc;
    const twImage = document.getElementById('mt-tw-image').value || ogImage;

    let tags = [];
    tags.push('<meta charset="UTF-8">');
    if (viewport) tags.push(`<meta name="viewport" content="${viewport}">`);
    if (title) tags.push(`<title>${escapeHtml(title)}</title>`);
    if (desc) tags.push(`<meta name="description" content="${escapeHtml(desc)}">`);
    if (keywords) tags.push(`<meta name="keywords" content="${escapeHtml(keywords)}">`);
    if (author) tags.push(`<meta name="author" content="${escapeHtml(author)}">`);
    if (robots !== 'index, follow') tags.push(`<meta name="robots" content="${robots}">`);
    if (canonical) tags.push(`<link rel="canonical" href="${escapeHtml(canonical)}">`);

    // Open Graph
    tags.push('');
    tags.push('<!-- Open Graph -->');
    tags.push(`<meta property="og:type" content="${ogType}">`);
    if (ogTitle) tags.push(`<meta property="og:title" content="${escapeHtml(ogTitle)}">`);
    if (ogDesc) tags.push(`<meta property="og:description" content="${escapeHtml(ogDesc)}">`);
    if (ogImage) tags.push(`<meta property="og:image" content="${escapeHtml(ogImage)}">`);
    if (ogUrl) tags.push(`<meta property="og:url" content="${escapeHtml(ogUrl)}">`);

    // Twitter Card
    tags.push('');
    tags.push('<!-- Twitter Card -->');
    tags.push(`<meta name="twitter:card" content="${twCard}">`);
    if (twTitle) tags.push(`<meta name="twitter:title" content="${escapeHtml(twTitle)}">`);
    if (twDesc) tags.push(`<meta name="twitter:description" content="${escapeHtml(twDesc)}">`);
    if (twImage) tags.push(`<meta name="twitter:image" content="${escapeHtml(twImage)}">`);

    const output = document.getElementById('mt-output');
    const copyBtn = output.querySelector('.copy-btn');
    output.innerHTML = tags.join('\n');
    if (copyBtn) output.appendChild(copyBtn);
    else {
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = '复制';
      btn.onclick = function() { copyMetaTags(this); };
      output.appendChild(btn);
    }
  };

  window.copyMetaTags = function(btn) {
    const output = document.getElementById('mt-output');
    const text = output.textContent.replace('复制', '').replace('✓ 已复制', '').trim();
    copyText(text, btn);
  };

  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // Init
  updateMetaPreview();
  generateMetaTags();
})();
