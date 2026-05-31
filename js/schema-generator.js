// Schema.org Generator
(function() {
  const page = document.getElementById('page-schema-generator');
  
  const schemaTypes = {
    Article: { icon: '📰', fields: [
      { name: 'headline', label: '标题', type: 'text', required: true },
      { name: 'description', label: '描述', type: 'textarea' },
      { name: 'image', label: '图片URL', type: 'url' },
      { name: 'authorName', label: '作者名称', type: 'text' },
      { name: 'authorType', label: '作者类型', type: 'select', options: ['Person', 'Organization'] },
      { name: 'publisherName', label: '发布者名称', type: 'text' },
      { name: 'publisherLogo', label: '发布者Logo URL', type: 'url' },
      { name: 'datePublished', label: '发布日期', type: 'date' },
      { name: 'dateModified', label: '修改日期', type: 'date' },
    ]},
    Product: { icon: '🛍️', fields: [
      { name: 'name', label: '产品名称', type: 'text', required: true },
      { name: 'description', label: '描述', type: 'textarea' },
      { name: 'image', label: '图片URL', type: 'url' },
      { name: 'brand', label: '品牌', type: 'text' },
      { name: 'sku', label: 'SKU', type: 'text' },
      { name: 'price', label: '价格', type: 'text' },
      { name: 'priceCurrency', label: '货币 (如 CNY, USD)', type: 'text', placeholder: 'CNY' },
      { name: 'availability', label: '库存状态', type: 'select', options: ['InStock', 'OutOfStock', 'PreOrder', 'LimitedAvailability'] },
      { name: 'ratingValue', label: '评分 (1-5)', type: 'number' },
      { name: 'reviewCount', label: '评论数量', type: 'number' },
    ]},
    LocalBusiness: { icon: '🏢', fields: [
      { name: 'name', label: '商家名称', type: 'text', required: true },
      { name: 'description', label: '描述', type: 'textarea' },
      { name: 'image', label: '图片URL', type: 'url' },
      { name: 'telephone', label: '电话', type: 'text' },
      { name: 'email', label: '邮箱', type: 'text' },
      { name: 'streetAddress', label: '街道地址', type: 'text' },
      { name: 'addressLocality', label: '城市', type: 'text' },
      { name: 'addressRegion', label: '省份', type: 'text' },
      { name: 'postalCode', label: '邮编', type: 'text' },
      { name: 'addressCountry', label: '国家', type: 'text', placeholder: 'CN' },
      { name: 'latitude', label: '纬度', type: 'text' },
      { name: 'longitude', label: '经度', type: 'text' },
      { name: 'openingHours', label: '营业时间', type: 'text', placeholder: 'Mo-Fr 09:00-17:00' },
    ]},
    FAQ: { icon: '❓', fields: [
      { name: 'faqItems', label: 'FAQ项目', type: 'faq-list' },
    ]},
    HowTo: { icon: '🔧', fields: [
      { name: 'name', label: '教程标题', type: 'text', required: true },
      { name: 'description', label: '描述', type: 'textarea' },
      { name: 'image', label: '图片URL', type: 'url' },
      { name: 'totalTime', label: '预计时间 (如 PT30M)', type: 'text', placeholder: 'PT30M' },
      { name: 'estimatedCost', label: '预计花费', type: 'text' },
      { name: 'steps', label: '步骤列表', type: 'steps-list' },
    ]},
    Recipe: { icon: '🍳', fields: [
      { name: 'name', label: '菜名', type: 'text', required: true },
      { name: 'description', label: '描述', type: 'textarea' },
      { name: 'image', label: '图片URL', type: 'url' },
      { name: 'authorName', label: '作者', type: 'text' },
      { name: 'prepTime', label: '准备时间 (如 PT15M)', type: 'text', placeholder: 'PT15M' },
      { name: 'cookTime', label: '烹饪时间 (如 PT30M)', type: 'text', placeholder: 'PT30M' },
      { name: 'totalTime', label: '总时间 (如 PT45M)', type: 'text', placeholder: 'PT45M' },
      { name: 'recipeYield', label: '份量', type: 'text', placeholder: '4人份' },
      { name: 'recipeCategory', label: '分类', type: 'text', placeholder: '中餐' },
      { name: 'recipeCuisine', label: '菜系', type: 'text', placeholder: '川菜' },
      { name: 'calories', label: '卡路里', type: 'text', placeholder: '350 calories' },
      { name: 'ingredients', label: '食材（每行一个）', type: 'textarea', placeholder: '食材1\n食材2' },
      { name: 'instructions', label: '步骤（每行一个）', type: 'textarea', placeholder: '步骤1\n步骤2' },
    ]},
    Event: { icon: '📅', fields: [
      { name: 'name', label: '活动名称', type: 'text', required: true },
      { name: 'description', label: '描述', type: 'textarea' },
      { name: 'image', label: '图片URL', type: 'url' },
      { name: 'startDate', label: '开始时间', type: 'datetime-local' },
      { name: 'endDate', label: '结束时间', type: 'datetime-local' },
      { name: 'locationName', label: '地点名称', type: 'text' },
      { name: 'streetAddress', label: '街道地址', type: 'text' },
      { name: 'addressLocality', label: '城市', type: 'text' },
      { name: 'addressRegion', label: '省份', type: 'text' },
      { name: 'eventStatus', label: '状态', type: 'select', options: ['EventScheduled', 'EventCancelled', 'EventPostponed', 'EventMovedOnline'] },
      { name: 'eventAttendanceMode', label: '参与方式', type: 'select', options: ['OfflineEventAttendanceMode', 'OnlineEventAttendanceMode', 'MixedEventAttendanceMode'] },
      { name: 'organizerName', label: '组织者', type: 'text' },
    ]},
    Person: { icon: '👤', fields: [
      { name: 'name', label: '姓名', type: 'text', required: true },
      { name: 'jobTitle', label: '职位', type: 'text' },
      { name: 'url', label: '个人网站', type: 'url' },
      { name: 'image', label: '头像URL', type: 'url' },
      { name: 'email', label: '邮箱', type: 'text' },
      { name: 'telephone', label: '电话', type: 'text' },
      { name: 'worksForName', label: '公司名称', type: 'text' },
      { name: 'sameAs', label: '社交链接（每行一个）', type: 'textarea', placeholder: 'https://twitter.com/...\nhttps://linkedin.com/in/...' },
    ]},
    Organization: { icon: '🏛️', fields: [
      { name: 'name', label: '组织名称', type: 'text', required: true },
      { name: 'description', label: '描述', type: 'textarea' },
      { name: 'url', label: '网站URL', type: 'url' },
      { name: 'logo', label: 'Logo URL', type: 'url' },
      { name: 'email', label: '邮箱', type: 'text' },
      { name: 'telephone', label: '电话', type: 'text' },
      { name: 'streetAddress', label: '街道地址', type: 'text' },
      { name: 'addressLocality', label: '城市', type: 'text' },
      { name: 'addressRegion', label: '省份', type: 'text' },
      { name: 'postalCode', label: '邮编', type: 'text' },
      { name: 'sameAs', label: '社交链接（每行一个）', type: 'textarea', placeholder: 'https://twitter.com/...\nhttps://linkedin.com/...' },
    ]},
  };

  let currentType = 'Article';
  let faqItems = [{ question: '', answer: '' }];
  let steps = [{ text: '' }];

  page.innerHTML = `
    <button class="back-btn" data-page="home">← 返回首页</button>
    <div class="tool-header"><span style="font-size:1.8rem">📋</span><h2>Schema.org生成器</h2></div>
    <p class="tool-description">生成JSON-LD结构化数据代码。选择类型，填写信息，一键生成标准Schema.org标记。</p>

    <div class="card">
      <h3>📑 选择Schema类型</h3>
      <div class="schema-type-selector" id="schema-types">
        ${Object.entries(schemaTypes).map(([key, val]) => 
          `<div class="schema-type-btn ${key === 'Article' ? 'active' : ''}" data-type="${key}" onclick="selectSchemaType('${key}', this)">${val.icon} ${key}</div>`
        ).join('')}
      </div>
    </div>

    <div class="form-row" style="margin-top:1rem;">
      <div style="flex:1">
        <div class="card">
          <h3 id="schema-form-title">📰 Article</h3>
          <div id="schema-form"></div>
          <div class="btn-group">
            <button class="btn btn-primary" onclick="generateSchema()">🔄 生成JSON-LD</button>
            <button class="btn btn-secondary" onclick="resetSchemaForm()">🗑️ 重置</button>
          </div>
        </div>
      </div>

      <div style="flex:1">
        <div class="card" style="position:relative;">
          <h3>📋 生成的JSON-LD</h3>
          <div class="code-output" id="schema-output" style="position:relative;">
            <button class="copy-btn" onclick="copyText(document.getElementById('schema-output').textContent.replace('复制','').trim(), this)">复制</button>
          </div>
          <div class="btn-group">
            <button class="btn btn-secondary" onclick="copySchemaOutput()">📋 复制</button>
            <button class="btn btn-success" onclick="downloadSchema()">⬇️ 下载JSON-LD</button>
          </div>
        </div>

        <div class="card">
          <h3>✅ 使用说明</h3>
          <ol style="font-size:0.85rem;color:var(--text-muted);padding-left:1.2rem;line-height:2;">
            <li>选择需要的Schema类型</li>
            <li>填写相关信息</li>
            <li>点击"生成JSON-LD"</li>
            <li>将生成的代码复制到HTML的 <code style="background:var(--bg);padding:0.1rem 0.3rem;border-radius:3px;">&lt;head&gt;</code> 标签内</li>
            <li>使用 <a href="https://search.google.com/test/rich-results" target="_blank">Google富媒体测试工具</a> 验证</li>
          </ol>
        </div>
      </div>
    </div>
  `;

  function renderForm(type) {
    const schema = schemaTypes[type];
    const form = document.getElementById('schema-form');
    document.getElementById('schema-form-title').textContent = `${schema.icon} ${type}`;

    let html = '';
    schema.fields.forEach(f => {
      if (f.type === 'faq-list') {
        html += `<div id="faq-container">
          <label style="display:block;font-size:0.85rem;font-weight:500;margin-bottom:0.35rem;">FAQ项目</label>
          <div id="faq-list">${renderFaqItems()}</div>
          <button class="btn btn-secondary btn-sm" onclick="addFaqItem()" style="margin-top:0.5rem;">➕ 添加FAQ</button>
        </div>`;
      } else if (f.type === 'steps-list') {
        html += `<div id="steps-container">
          <label style="display:block;font-size:0.85rem;font-weight:500;margin-bottom:0.35rem;">步骤列表</label>
          <div id="steps-list">${renderSteps()}</div>
          <button class="btn btn-secondary btn-sm" onclick="addStep()" style="margin-top:0.5rem;">➕ 添加步骤</button>
        </div>`;
      } else {
        html += `<div class="form-group">
          <label>${f.label}${f.required ? ' *' : ''}</label>`;
        if (f.type === 'textarea') {
          html += `<textarea id="sf-${f.name}" placeholder="${f.placeholder || ''}" rows="3">${f.defaultVal || ''}</textarea>`;
        } else if (f.type === 'select') {
          html += `<select id="sf-${f.name}">${f.options.map(o => `<option value="${o}">${o}</option>`).join('')}</select>`;
        } else {
          html += `<input type="${f.type}" id="sf-${f.name}" placeholder="${f.placeholder || ''}">`;
        }
        html += '</div>';
      }
    });
    form.innerHTML = html;
  }

  function renderFaqItems() {
    return faqItems.map((item, i) => `
      <div class="card" style="margin-bottom:0.5rem;padding:0.75rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
          <span style="font-weight:500;font-size:0.85rem;">FAQ #${i+1}</span>
          ${faqItems.length > 1 ? `<button class="btn btn-danger btn-sm" onclick="removeFaqItem(${i})" style="padding:0.1rem 0.4rem;font-size:0.7rem;">✕</button>` : ''}
        </div>
        <input type="text" class="faq-q" value="${escapeAttr(item.question)}" placeholder="问题" style="margin-bottom:0.5rem;">
        <textarea class="faq-a" rows="2" placeholder="答案">${escapeHtml(item.answer)}</textarea>
      </div>
    `).join('');
  }

  function renderSteps() {
    return steps.map((step, i) => `
      <div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.5rem;">
        <span style="color:var(--text-muted);font-size:0.85rem;min-width:30px;">${i+1}.</span>
        <input type="text" class="step-text" value="${escapeAttr(step.text)}" placeholder="步骤描述" style="flex:1;">
        ${steps.length > 1 ? `<button class="btn btn-danger btn-sm" onclick="removeStep(${i})" style="padding:0.1rem 0.4rem;font-size:0.7rem;">✕</button>` : ''}
      </div>
    `).join('');
  }

  window.selectSchemaType = function(type, btn) {
    currentType = type;
    faqItems = [{ question: '', answer: '' }];
    steps = [{ text: '' }];
    page.querySelectorAll('.schema-type-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderForm(type);
  };

  window.addFaqItem = function() {
    faqItems.push({ question: '', answer: '' });
    document.getElementById('faq-list').innerHTML = renderFaqItems();
  };

  window.removeFaqItem = function(index) {
    faqItems.splice(index, 1);
    document.getElementById('faq-list').innerHTML = renderFaqItems();
  };

  window.addStep = function() {
    steps.push({ text: '' });
    document.getElementById('steps-list').innerHTML = renderSteps();
  };

  window.removeStep = function(index) {
    steps.splice(index, 1);
    document.getElementById('steps-list').innerHTML = renderSteps();
  };

  window.generateSchema = function() {
    const schema = schemaTypes[currentType];
    const data = { '@context': 'https://schema.org' };

    switch (currentType) {
      case 'Article':
        data['@type'] = 'Article';
        data.headline = gv('headline');
        data.description = gv('description');
        if (gv('image')) data.image = gv('image');
        if (gv('authorName')) data.author = { '@type': gv('authorType') || 'Person', name: gv('authorName') };
        if (gv('publisherName')) data.publisher = { '@type': 'Organization', name: gv('publisherName'), logo: gv('publisherLogo') ? { '@type': 'ImageObject', url: gv('publisherLogo') } : undefined };
        if (gv('datePublished')) data.datePublished = gv('datePublished');
        if (gv('dateModified')) data.dateModified = gv('dateModified');
        break;

      case 'Product':
        data['@type'] = 'Product';
        data.name = gv('name');
        data.description = gv('description');
        if (gv('image')) data.image = gv('image');
        if (gv('brand')) data.brand = { '@type': 'Brand', name: gv('brand') };
        if (gv('sku')) data.sku = gv('sku');
        if (gv('price')) data.offers = { '@type': 'Offer', price: gv('price'), priceCurrency: gv('priceCurrency') || 'CNY', availability: `https://schema.org/${gv('availability') || 'InStock'}` };
        if (gv('ratingValue')) data.aggregateRating = { '@type': 'AggregateRating', ratingValue: gv('ratingValue'), bestRating: '5', reviewCount: gv('reviewCount') || '1' };
        break;

      case 'LocalBusiness':
        data['@type'] = 'LocalBusiness';
        data.name = gv('name');
        data.description = gv('description');
        if (gv('image')) data.image = gv('image');
        if (gv('telephone')) data.telephone = gv('telephone');
        if (gv('email')) data.email = gv('email');
        if (gv('streetAddress')) data.address = { '@type': 'PostalAddress', streetAddress: gv('streetAddress'), addressLocality: gv('addressLocality'), addressRegion: gv('addressRegion'), postalCode: gv('postalCode'), addressCountry: gv('addressCountry') || 'CN' };
        if (gv('latitude')) data.geo = { '@type': 'GeoCoordinates', latitude: gv('latitude'), longitude: gv('longitude') };
        if (gv('openingHours')) data.openingHours = gv('openingHours');
        break;

      case 'FAQ':
        collectFaqData();
        data['@type'] = 'FAQPage';
        data.mainEntity = faqItems.filter(f => f.question).map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer }
        }));
        break;

      case 'HowTo':
        collectStepsData();
        data['@type'] = 'HowTo';
        data.name = gv('name');
        data.description = gv('description');
        if (gv('image')) data.image = gv('image');
        if (gv('totalTime')) data.totalTime = gv('totalTime');
        if (gv('estimatedCost')) data.estimatedCost = { '@type': 'MonetaryAmount', value: gv('estimatedCost'), currency: 'CNY' };
        data.step = steps.filter(s => s.text).map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          text: s.text
        }));
        break;

      case 'Recipe':
        data['@type'] = 'Recipe';
        data.name = gv('name');
        data.description = gv('description');
        if (gv('image')) data.image = gv('image');
        if (gv('authorName')) data.author = { '@type': 'Person', name: gv('authorName') };
        if (gv('prepTime')) data.prepTime = gv('prepTime');
        if (gv('cookTime')) data.cookTime = gv('cookTime');
        if (gv('totalTime')) data.totalTime = gv('totalTime');
        if (gv('recipeYield')) data.recipeYield = gv('recipeYield');
        if (gv('recipeCategory')) data.recipeCategory = gv('recipeCategory');
        if (gv('recipeCuisine')) data.recipeCuisine = gv('recipeCuisine');
        if (gv('calories')) data.nutrition = { '@type': 'NutritionInformation', calories: gv('calories') };
        if (gv('ingredients')) data.recipeIngredient = gv('ingredients').split('\n').filter(s => s.trim());
        if (gv('instructions')) data.recipeInstructions = gv('instructions').split('\n').filter(s => s.trim()).map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s.trim() }));
        break;

      case 'Event':
        data['@type'] = 'Event';
        data.name = gv('name');
        data.description = gv('description');
        if (gv('image')) data.image = gv('image');
        if (gv('startDate')) data.startDate = gv('startDate');
        if (gv('endDate')) data.endDate = gv('endDate');
        if (gv('locationName')) data.location = { '@type': 'Place', name: gv('locationName'), address: { '@type': 'PostalAddress', streetAddress: gv('streetAddress'), addressLocality: gv('addressLocality'), addressRegion: gv('addressRegion') } };
        if (gv('eventStatus')) data.eventStatus = `https://schema.org/${gv('eventStatus')}`;
        if (gv('eventAttendanceMode')) data.eventAttendanceMode = `https://schema.org/${gv('eventAttendanceMode')}`;
        if (gv('organizerName')) data.organizer = { '@type': 'Organization', name: gv('organizerName') };
        break;

      case 'Person':
        data['@type'] = 'Person';
        data.name = gv('name');
        if (gv('jobTitle')) data.jobTitle = gv('jobTitle');
        if (gv('url')) data.url = gv('url');
        if (gv('image')) data.image = gv('image');
        if (gv('email')) data.email = gv('email');
        if (gv('telephone')) data.telephone = gv('telephone');
        if (gv('worksForName')) data.worksFor = { '@type': 'Organization', name: gv('worksForName') };
        if (gv('sameAs')) data.sameAs = gv('sameAs').split('\n').filter(s => s.trim());
        break;

      case 'Organization':
        data['@type'] = 'Organization';
        data.name = gv('name');
        if (gv('description')) data.description = gv('description');
        if (gv('url')) data.url = gv('url');
        if (gv('logo')) data.logo = gv('logo');
        if (gv('email')) data.email = gv('email');
        if (gv('telephone')) data.telephone = gv('telephone');
        if (gv('streetAddress')) data.address = { '@type': 'PostalAddress', streetAddress: gv('streetAddress'), addressLocality: gv('addressLocality'), addressRegion: gv('addressRegion'), postalCode: gv('postalCode') };
        if (gv('sameAs')) data.sameAs = gv('sameAs').split('\n').filter(s => s.trim());
        break;
    }

    // Clean undefined
    const clean = JSON.parse(JSON.stringify(data));
    const jsonLd = `<script type="application/ld+json">\n${JSON.stringify(clean, null, 2)}\n</script>`;
    
    const output = document.getElementById('schema-output');
    output.textContent = jsonLd;
    showToast('JSON-LD已生成');
  };

  function gv(id) {
    const el = document.getElementById('sf-' + id);
    return el ? el.value.trim() : '';
  }

  function collectFaqData() {
    const container = document.getElementById('faq-list');
    if (!container) return;
    const items = container.querySelectorAll('.card');
    faqItems = [];
    items.forEach(item => {
      faqItems.push({
        question: item.querySelector('.faq-q').value.trim(),
        answer: item.querySelector('.faq-a').value.trim()
      });
    });
  }

  function collectStepsData() {
    const container = document.getElementById('steps-list');
    if (!container) return;
    const items = container.querySelectorAll('.step-text');
    steps = [];
    items.forEach(input => {
      steps.push({ text: input.value.trim() });
    });
  }

  window.copySchemaOutput = function() {
    copyText(document.getElementById('schema-output').textContent.trim());
  };

  window.downloadSchema = function() {
    downloadFile('schema.jsonld', document.getElementById('schema-output').textContent.trim(), 'application/ld+json');
  };

  window.resetSchemaForm = function() {
    faqItems = [{ question: '', answer: '' }];
    steps = [{ text: '' }];
    renderForm(currentType);
    document.getElementById('schema-output').textContent = '';
  };

  function escapeHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function escapeAttr(s) { return s.replace(/"/g, '&quot;'); }

  // Init
  renderForm('Article');
})();
