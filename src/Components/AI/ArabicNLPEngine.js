// محرك معالجة اللغة العربية الطبيعية - نموذج AI خفيف ومتطور
class ArabicNLPEngine {
  constructor() {
    // نموذج اللغة العربية المدرب مسبقاً
    this.arabicPatterns = {
      // أنماط التحية والترحيب
      greetings: {
        patterns: [
          /^(مرحبا|مرحباً|اهلا|أهلا|أهلاً|هلا|هاي|هاى|السلام عليكم|صباح الخير|مساء الخير|سلام)/i,
          /^(ازيك|كيفك|كيف حالك|شو اخبارك|كيف الحال)/i
        ],
        responses: [
          "أهلاً وسهلاً بك! 😊 كيف يمكنني مساعدتك اليوم؟",
          "مرحباً بك في متجرنا! 🌟 أنا هنا لأساعدك في إيجاد ما تبحث عنه",
          "أهلاً! يسعدني التحدث معك 😊 كيف أقدر أساعدك؟",
          "وعليكم السلام! تشرفنا بزيارتك 🙏 إيش تحتاج؟"
        ]
      },

      // أنماط السؤال عن المنتجات
      productQueries: {
        patterns: [
          /(أريد|بدي|عايز|عاوز|ابغى|ابي|محتاج|بحاجة).*(منتج|سلعة|حاجة|شي|شيء)/i,
          /(عندكم|عندك|في عندكم|موجود|متوفر).*([\u0600-\u06FF]+)/i,
          /(ابحث عن|دور على|بدور على|وين|فين|اين).*([\u0600-\u06FF]+)/i
        ],
        responseTemplates: [
          "طبعاً! عندنا {count} {product} رائع، خليني أوريك أفضلها:",
          "أكيد! لقيت لك {count} خيار من {product}، شوف هذول:",
          "تمام، عندي {count} {product} ممتاز، تفضل شوفهم:"
        ]
      },

      // أنماط الأسعار والعروض
      priceQueries: {
        patterns: [
          /(كم|بكم|كم سعر|شو سعر|ايش سعر|قديش|قداش).*/i,
          /(رخيص|غالي|مناسب|معقول|عرض|خصم|تخفيض).*/i,
          /(ارخص|أرخص|اغلى|أغلى|احسن سعر|أحسن سعر).*/i
        ],
        responses: [
          "عندنا عروض مميزة جداً! الأسعار تبدأ من {minPrice}$ وفي خصومات تصل لـ {discount}%! 🎉",
          "أسعارنا منافسة جداً! وعندنا عروض خاصة هالأسبوع 💰",
          "بالنسبة للأسعار، عندنا تشكيلة واسعة تناسب كل الميزانيات 👍"
        ]
      },

      // أنماط الشكر والوداع
      farewell: {
        patterns: [
          /(شكرا|شكراً|مشكور|تسلم|يعطيك العافية|الله يعطيك العافية)/i,
          /(باي|باى|وداعا|وداعاً|مع السلامة|الى اللقاء|يلا سلام)/i
        ],
        responses: [
          "العفو حبيبي! كان من دواعي سروري 😊 تعال زورنا مرة ثانية!",
          "الله يعافيك! نورتنا والله 🌟 استناك المرة الجاية",
          "تسلم! كنت سعيد بخدمتك 🙏 ما تنساناش!",
          "مع السلامة! يا ريت تكون لقيت اللي بدك إياه 👋"
        ]
      }
    };

    // قاموس المشاعر والتعابير البشرية
    this.humanExpressions = {
      excitement: ["واااو! 🤩", "يا سلام! 😍", "رهيب! 🔥", "خيااال! ✨"],
      thinking: ["خليني أشوف... 🤔", "لحظة بس... 💭", "همم... 🧐", "طيب... 🤓"],
      empathy: ["أفهمك تماماً", "معك حق", "أكيد", "صح كلامك"],
      encouragement: ["ما تقلق!", "خليها علي!", "راح أساعدك!", "تمام التمام!"]
    };

    // ذاكرة المحادثة للسياق
    this.conversationMemory = {
      userName: null,
      preferences: [],
      searchHistory: [],
      mood: 'neutral',
      interactionCount: 0
    };

    // نموذج تحليل المشاعر
    this.sentimentKeywords = {
      positive: ['ممتاز', 'رائع', 'حلو', 'جميل', 'عظيم', 'مذهل', 'خيال', 'روعة'],
      negative: ['سيء', 'مش حلو', 'غالي', 'ما بدي', 'لا', 'مش عاجبني'],
      neutral: ['عادي', 'ممكن', 'يمكن', 'شوف', 'طيب']
    };
  }

  // تحليل المشاعر في النص
  analyzeSentiment(text) {
    let sentiment = 'neutral';
    let score = 0;

    this.sentimentKeywords.positive.forEach(word => {
      if (text.includes(word)) score += 1;
    });

    this.sentimentKeywords.negative.forEach(word => {
      if (text.includes(word)) score -= 1;
    });

    if (score > 0) sentiment = 'positive';
    else if (score < 0) sentiment = 'negative';

    return { sentiment, score };
  }

  // استخراج الكيانات (Entities) من النص
  extractEntities(text) {
    const entities = {
      products: [],
      brands: [],
      categories: [],
      prices: [],
      colors: []
    };

    // استخراج الأسعار
    const pricePattern = /(\d+)\s*(دولار|ريال|جنيه|دينار|\$)/gi;
    const priceMatches = text.matchAll(pricePattern);
    for (const match of priceMatches) {
      entities.prices.push(parseInt(match[1]));
    }

    // استخراج الألوان
    const colors = ['أحمر', 'أزرق', 'أخضر', 'أسود', 'أبيض', 'رمادي', 'ذهبي', 'فضي'];
    colors.forEach(color => {
      if (text.includes(color)) {
        entities.colors.push(color);
      }
    });

    // استخراج أسماء المنتجات الشائعة
    const commonProducts = ['هاتف', 'لابتوب', 'تابلت', 'ساعة', 'سماعة', 'كاميرا', 'تلفزيون'];
    commonProducts.forEach(product => {
      if (text.includes(product)) {
        entities.products.push(product);
      }
    });

    return entities;
  }

  // توليد رد بشري طبيعي
  generateHumanResponse(intent, context = {}) {
    const { sentiment } = this.analyzeSentiment(context.userMessage || '');
    const entities = this.extractEntities(context.userMessage || '');
    
    let response = '';
    
    // إضافة تعبير بشري في البداية
    if (sentiment === 'positive') {
      response += this.getRandomElement(this.humanExpressions.excitement) + ' ';
    } else if (context.isThinking) {
      response += this.getRandomElement(this.humanExpressions.thinking) + ' ';
    }

    // بناء الرد الأساسي
    switch(intent) {
      case 'greeting':
        response += this.handleGreeting(context);
        break;
      
      case 'product_search':
        response += this.handleProductSearch(entities, context);
        break;
      
      case 'price_inquiry':
        response += this.handlePriceInquiry(entities, context);
        break;
      
      case 'recommendation':
        response += this.handleRecommendation(context);
        break;
      
      case 'farewell':
        response += this.handleFarewell(context);
        break;
      
      default:
        response += this.handleGeneral(context);
    }

    // إضافة لمسة شخصية
    if (this.conversationMemory.interactionCount > 2) {
      response += this.addPersonalTouch();
    }

    // تحديث الذاكرة
    this.updateMemory(intent, entities, sentiment);

    return response;
  }

  // معالجة التحية
  handleGreeting(context) {
    const greetings = [
      "أهلاً وسهلاً! كيف حالك اليوم؟ 😊",
      "مرحباً! تشرفنا بزيارتك، كيف أقدر أساعدك؟",
      "أهلاً بك! أنا زحل، مساعدك الشخصي في التسوق 🛍️",
      "يا هلا والله! نورت المتجر، إيش تدور عليه؟"
    ];
    
    let greeting = this.getRandomElement(greetings);
    
    // إضافة تحية شخصية إذا كان العميل عائد
    if (this.conversationMemory.interactionCount > 0) {
      greeting = "أهلاً بعودتك! 🌟 شو الجديد معك اليوم؟";
    }
    
    return greeting;
  }

  // معالجة البحث عن المنتجات
  handleProductSearch(entities, context) {
    const { products } = context;
    
    if (!products || products.length === 0) {
      return "همم... ما لقيت الشي اللي بتدور عليه بالضبط، بس خليني أوريك أحدث المنتجات عندنا! 🎁";
    }

    const responses = [
      `لقيت لك ${products.length} منتج رهيب! تعال شوفهم: 👀`,
      `عندي ${products.length} خيار ممتاز لك! كلهم حلوين والله: ✨`,
      `واااو! لقيت ${products.length} منتج يجنن! شوف هذول: 🔥`
    ];

    let response = this.getRandomElement(responses);
    
    // إضافة تفاصيل عن المنتجات
    if (entities.colors.length > 0) {
      response += `\nوكمان متوفرين باللون ${entities.colors[0]} اللي بتحبه!`;
    }
    
    if (entities.prices.length > 0) {
      response += `\nوالأسعار في حدود ${entities.prices[0]}$ زي ما طلبت 👍`;
    }

    return response;
  }

  // معالجة الاستفسار عن الأسعار
  handlePriceInquiry(entities, context) {
    const responses = [
      "بالنسبة للأسعار، عندنا شغلات تبدأ من 10$ لحد 1000$، حسب اللي بدك إياه! 💰",
      "أسعارنا والله منافسة! وكمان في عروض حلوة هالفترة 🎉",
      "الأسعار عندنا مرنة ومناسبة لكل الناس، وفي خصومات كمان! 💸"
    ];

    let response = this.getRandomElement(responses);
    
    if (context.hasDiscounts) {
      response += "\n\nوبصراحة، في خصومات تصل لـ 50% على منتجات مختارة! 🔥";
    }

    return response;
  }

  // معالجة التوصيات
  handleRecommendation(context) {
    const responses = [
      "بناءً على ذوقك الحلو، أنصحك تشوف هذي المنتجات: 🌟",
      "أنا متأكد إنك راح تحب هذول! شوفهم: 💎",
      "عندي اقتراحات رهيبة لك! تعال شوف: 🎯"
    ];

    return this.getRandomElement(responses);
  }

  // معالجة الوداع
  handleFarewell(context) {
    const farewells = [
      "يلا مع السلامة! كان من دواعي سروري 😊 استناك قريب!",
      "الله معك! إن شاء الله تكون لقيت اللي بدك إياه 🙏",
      "باااي! نورتنا والله، تعال زورنا كل ما بدك! 👋",
      "توكل على الله! وما تنساناش ها 😄"
    ];

    return this.getRandomElement(farewells);
  }

  // معالجة عامة
  handleGeneral(context) {
    const responses = [
      "تمام، خليني أساعدك! إيش بالضبط اللي بتدور عليه؟ 🤔",
      "أكيد! أنا هنا عشان أساعدك، قول لي إيش تحتاج؟ 😊",
      "طيب، ممكن توضح لي أكثر عشان أقدر أساعدك أحسن؟ 💭"
    ];

    return this.getRandomElement(responses);
  }

  // إضافة لمسة شخصية
  addPersonalTouch() {
    const touches = [
      "\n\nوبالمناسبة، ذوقك حلو! 😊",
      "\n\nأنا هنا لو احتجت أي مساعدة ثانية! 👍",
      "\n\nوما تنسى تشوف العروض الجديدة! 🎁",
      "\n\nيا ريت تلاقي اللي يعجبك! 🌟"
    ];

    return this.getRandomElement(touches);
  }

  // تحديث الذاكرة
  updateMemory(intent, entities, sentiment) {
    this.conversationMemory.interactionCount++;
    
    if (entities.products.length > 0) {
      this.conversationMemory.searchHistory.push(...entities.products);
    }
    
    if (sentiment !== 'neutral') {
      this.conversationMemory.mood = sentiment;
    }
    
    // حفظ التفضيلات
    if (entities.colors.length > 0 || entities.prices.length > 0) {
      this.conversationMemory.preferences.push({
        colors: entities.colors,
        priceRange: entities.prices
      });
    }
  }

  // دالة مساعدة للحصول على عنصر عشوائي
  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // تحديد النية من الرسالة
  detectIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    // فحص كل نمط
    for (const [category, data] of Object.entries(this.arabicPatterns)) {
      if (data.patterns) {
        for (const pattern of data.patterns) {
          if (pattern.test(lowerMessage)) {
            return category === 'greetings' ? 'greeting' :
                   category === 'productQueries' ? 'product_search' :
                   category === 'priceQueries' ? 'price_inquiry' :
                   category === 'farewell' ? 'farewell' : 'general';
          }
        }
      }
    }
    
    // إذا لم يتطابق أي نمط، حاول تحديد النية من الكلمات المفتاحية
    if (lowerMessage.includes('توصي') || lowerMessage.includes('نصيحة') || lowerMessage.includes('اقتراح')) {
      return 'recommendation';
    }
    
    return 'general';
  }

  // معالجة الرسالة الرئيسية
  processMessage(userMessage, context = {}) {
    // تحديد النية
    const intent = this.detectIntent(userMessage);
    
    // إضافة الرسالة للسياق
    context.userMessage = userMessage;
    context.isThinking = true;
    
    // توليد الرد البشري
    const response = this.generateHumanResponse(intent, context);
    
    return {
      text: response,
      intent: intent,
      sentiment: this.analyzeSentiment(userMessage),
      entities: this.extractEntities(userMessage),
      suggestions: this.generateSuggestions(intent)
    };
  }

  // توليد اقتراحات للمستخدم
  generateSuggestions(intent) {
    const suggestions = {
      greeting: ["أريد أن أرى المنتجات", "ما هي العروض المتاحة؟", "أبحث عن هاتف"],
      product_search: ["أريد رؤية المزيد", "ما هو السعر؟", "هل يوجد خصومات؟"],
      price_inquiry: ["أريد الأرخص", "أريد الأفضل جودة", "ما هي طرق الدفع؟"],
      recommendation: ["أريد خيارات أخرى", "ما رأيك في هذا؟", "أيهما أفضل؟"],
      farewell: ["شكراً لك", "إلى اللقاء", "سأعود لاحقاً"],
      general: ["أريد المساعدة", "أبحث عن منتج", "ما هي التصنيفات المتاحة؟"]
    };

    return suggestions[intent] || suggestions.general;
  }
}

export default ArabicNLPEngine;
