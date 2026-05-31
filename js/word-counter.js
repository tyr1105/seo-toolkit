// Word Counter & Text Analyzer
(function() {
  const page = document.getElementById('page-word-counter');
  page.innerHTML = `
    <button class="back-btn" data-page="home">← 返回首页</button>
    <div class="tool-header"><span style="font-size:1.8rem">📝</span><h2>字数统计工具</h2></div>
    <p class="tool-description">全面分析文本内容：字数、句数、阅读时间、关键词密度、可读性评分。</p>

    <div class="form-row">
      <div style="flex:1">
        <div class="card">
          <h3>📝 输入文本</h3>
          <div class="form-group">
            <textarea id="wc-input" rows="15" placeholder="在此粘贴或输入文本内容..." style="min-height:300px;"></textarea>
          </div>
        </div>
      </div>

      <div style="flex:1">
        <div class="card">
          <h3>📊 基本统计</h3>
          <div class="stats-bar" id="wc-stats">
            <div class="stat-pill">词数 <span class="num" id="wc-words">0</span></div>
            <div class="stat-pill">字符 <span class="num" id="wc-chars">0</span></div>
            <div class="stat-pill">字符(无空格) <span class="num" id="wc-chars-ns">0</span></div>
            <div class="stat-pill">句子 <span class="num" id="wc-sentences">0</span></div>
            <div class="stat-pill">段落 <span class="num" id="wc-paragraphs">0</span></div>
          </div>
        </div>

        <div class="card">
          <h3>⏱️ 阅读时间</h3>
          <div class="stats-bar">
            <div class="stat-pill">英文 <span class="num" id="wc-read-en">0分钟</span></div>
            <div class="stat-pill">中文 <span class="num" id="wc-read-zh">0分钟</span></div>
            <div class="stat-pill">平均词长 <span class="num" id="wc-avg-word">0</span></div>
            <div class="stat-pill">平均句长 <span class="num" id="wc-avg-sentence">0</span></div>
          </div>
        </div>

        <div class="card">
          <h3>📖 可读性评分 (Flesch Reading Ease)</h3>
          <div style="display:flex;align-items:center;gap:1rem;">
            <div style="font-size:2.5rem;font-weight:800;color:var(--primary);" id="wc-flesch">--</div>
            <div>
              <div id="wc-flesch-label" style="font-weight:600;">输入文本后计算</div>
              <div style="font-size:0.8rem;color:var(--text-muted);">分数越高越容易阅读</div>
            </div>
          </div>
          <div style="margin-top:0.5rem;font-size:0.8rem;color:var(--text-muted);">
            90-100: 非常容易 | 60-70: 标准 | 30-50: 较难 | 0-30: 非常难
          </div>
        </div>

        <div class="card">
          <h3>🔑 关键词密度 (Top 10)</h3>
          <table class="kw-table">
            <thead>
              <tr><th>关键词</th><th>次数</th><th>密度</th><th>占比</th></tr>
            </thead>
            <tbody id="wc-keywords">
              <tr><td colspan="4" style="text-align:center;color:var(--text-muted);">输入文本后分析</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  document.getElementById('wc-input').addEventListener('input', analyzeText);

  function analyzeText() {
    const text = document.getElementById('wc-input').value;
    
    if (!text.trim()) {
      document.getElementById('wc-words').textContent = '0';
      document.getElementById('wc-chars').textContent = '0';
      document.getElementById('wc-chars-ns').textContent = '0';
      document.getElementById('wc-sentences').textContent = '0';
      document.getElementById('wc-paragraphs').textContent = '0';
      document.getElementById('wc-read-en').textContent = '0分钟';
      document.getElementById('wc-read-zh').textContent = '0分钟';
      document.getElementById('wc-avg-word').textContent = '0';
      document.getElementById('wc-avg-sentence').textContent = '0';
      document.getElementById('wc-flesch').textContent = '--';
      document.getElementById('wc-flesch-label').textContent = '输入文本后计算';
      document.getElementById('wc-keywords').innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--text-muted);">输入文本后分析</td></tr>';
      return;
    }

    // Basic counts
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length || (text.trim() ? 1 : 0);
    
    // Words (handle both English and Chinese)
    const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;
    const englishWords = text.replace(/[\u4e00-\u9fff]/g, ' ').trim().split(/\s+/).filter(w => w).length;
    const totalWords = englishWords + chineseChars;

    // Sentences
    const sentences = text.split(/[.!?。！？]+/).filter(s => s.trim()).length || 1;

    // Reading time
    const readEn = Math.max(1, Math.ceil(totalWords / 250));
    const readZh = Math.max(1, Math.ceil(totalWords / 200));

    // Averages
    const avgWordLen = englishWords > 0 ? 
      (text.replace(/[\u4e00-\u9fff]/g, ' ').trim().split(/\s+/).filter(w => w).reduce((s, w) => s + w.length, 0) / englishWords).toFixed(1) : 0;
    const avgSentenceLen = sentences > 0 ? (totalWords / sentences).toFixed(1) : 0;

    // Flesch Reading Ease (English)
    let flesch = 0;
    if (englishWords > 0) {
      const syllableCount = countSyllables(text);
      if (sentences > 0 && englishWords > 0) {
        flesch = 206.835 - 1.015 * (englishWords / sentences) - 84.6 * (syllableCount / englishWords);
        flesch = Math.max(0, Math.min(100, flesch));
      }
    }

    // Update UI
    document.getElementById('wc-words').textContent = totalWords;
    document.getElementById('wc-chars').textContent = chars;
    document.getElementById('wc-chars-ns').textContent = charsNoSpace;
    document.getElementById('wc-sentences').textContent = sentences;
    document.getElementById('wc-paragraphs').textContent = paragraphs;
    document.getElementById('wc-read-en').textContent = readEn + '分钟';
    document.getElementById('wc-read-zh').textContent = readZh + '分钟';
    document.getElementById('wc-avg-word').textContent = avgWordLen;
    document.getElementById('wc-avg-sentence').textContent = avgSentenceLen;
    document.getElementById('wc-flesch').textContent = flesch > 0 ? Math.round(flesch) : '--';
    
    let fleschLabel = '不适用（需要英文文本）';
    if (flesch >= 90) fleschLabel = '非常容易阅读';
    else if (flesch >= 80) fleschLabel = '容易阅读';
    else if (flesch >= 70) fleschLabel = '较容易';
    else if (flesch >= 60) fleschLabel = '标准难度';
    else if (flesch >= 50) fleschLabel = '较难阅读';
    else if (flesch >= 30) fleschLabel = '难阅读';
    else if (flesch > 0) fleschLabel = '非常难阅读';
    document.getElementById('wc-flesch-label').textContent = fleschLabel;

    // Keyword density
    const words = text.toLowerCase()
      .replace(/[\u4e00-\u9fff]/g, ' ')
      .replace(/[^a-z\s'-]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2);
    
    const stopWords = new Set(['the','and','for','are','but','not','you','all','can','her','was','one','our','out','had','has','his','how','its','may','new','now','old','see','way','who','did','get','has','him','let','say','she','too','use','its','this','that','with','have','from','they','been','said','each','which','their','will','other','about','many','then','them','these','some','would','make','like','into','time','very','when','come','could','more','made','after','also','did','just','than']);
    const filteredWords = words.filter(w => !stopWords.has(w));

    const freq = {};
    filteredWords.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const maxCount = sorted.length > 0 ? sorted[0][1] : 1;
    
    const tbody = document.getElementById('wc-keywords');
    if (sorted.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--text-muted);">关键词不足</td></tr>';
    } else {
      tbody.innerHTML = sorted.map(([word, count]) => {
        const density = ((count / totalWords) * 100).toFixed(2);
        const barWidth = (count / maxCount * 100).toFixed(0);
        return `<tr>
          <td style="font-weight:500;">${escapeHtml(word)}</td>
          <td>${count}</td>
          <td>${density}%</td>
          <td><div class="kw-bar-bg"><div class="kw-bar" style="width:${barWidth}%"></div></div></td>
        </tr>`;
      }).join('');
    }
  }

  function countSyllables(text) {
    const words = text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w);
    let total = 0;
    words.forEach(word => {
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
      word = word.replace(/^y/, '');
      const m = word.match(/[aeiouy]{1,2}/g);
      total += m ? m.length : 1;
    });
    return total;
  }

  function escapeHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
})();
