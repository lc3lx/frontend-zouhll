// محرك الذكاء الاصطناعي المحلي لزحل AI
import ArabicNLPEngine from './ArabicNLPEngine';

class AIEngine {
  constructor(products, categories, brands) {
    this.products = products?.data || [];
    this.categories = categories?.data || [];
    this.brands = brands?.data || [];
    
    // تهيئة محرك معالجة اللغة العربية
    this.nlpEngine = new ArabicNLPEngine();
    
    // قاعدة المعرفة والكلمات المفتاحية
    this.knowledgeBase = {
      greetings: ['مرحبا', 'السلام', 'صباح', 'مساء', 'هاي', 'هلا', 'اهلا'],
      products: ['منتج', 'منتجات', 'بضاعة', 'سلعة', 'اشتري', 'شراء', 'بدي', 'اريد'],
      categories: ['تصنيف', 'قسم', 'اقسام', 'نوع', 'انواع', 'فئة', 'فئات'],
      brands: ['ماركة', 'ماركات', 'براند', 'علامة تجارية', 'شركة'],
      prices: ['سعر', 'اسعار', 'كم', 'بكم', 'تكلفة', 'رخيص', 'غالي', 'عرض', 'خصم'],
      search: ['ابحث', 'دور', 'وين', 'فين', 'اين', 'بحث'],
      help: ['مساعدة', 'ساعدني', 'كيف', 'شو', 'ايش', 'ما هو', 'ما هي'],
      thanks: ['شكرا', 'مشكور', 'تسلم', 'يعطيك العافية'],
      bye: ['باي', 'وداعا', 'سلام', 'مع السلامة', 'الى اللقاء']
    };

    // ردود جاهزة للتسويق
    this.marketingResponses = [
      '🎯 عرض خاص اليوم فقط!',
      '⚡ لا تفوت هذه الفرصة الذهبية!',
      '🔥 منتجات حصرية بأسعار منافسة!',
      '💎 جودة عالية وضمان شامل!',
      '🚀 شحن سريع لجميع المناطق!',
      '✨ تشكيلة واسعة تناسب جميع الأذواق!'
    ];
  }

  // تحليل النية من الرسالة
  analyzeIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [intent, keywords] of Object.entries(this.knowledgeBase)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return intent;
      }
    }
    
    return 'general';
  }

  // البحث في المنتجات
  searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    
    return this.products.filter(product => {
      const title = product.title?.toLowerCase() || '';
      const description = product.description?.toLowerCase() || '';
      const categoryName = product.category?.name?.toLowerCase() || '';
      const brandName = product.brand?.name?.toLowerCase() || '';
      
      return title.includes(lowerQuery) || 
             description.includes(lowerQuery) ||
             categoryName.includes(lowerQuery) ||
             brandName.includes(lowerQuery);
    });
  }

  // البحث في التصنيفات
  searchCategories(query) {
    const lowerQuery = query.toLowerCase();
    
    return this.categories.filter(category => {
      const name = category.name?.toLowerCase() || '';
      return name.includes(lowerQuery);
    });
  }

  // البحث في الماركات
  searchBrands(query) {
    const lowerQuery = query.toLowerCase();
    
    return this.brands.filter(brand => {
      const name = brand.name?.toLowerCase() || '';
      return name.includes(lowerQuery);
    });
  }

  // الحصول على أفضل العروض
  getBestOffers() {
    return this.products
      .filter(p => p.priceAfterDiscount && p.priceAfterDiscount < p.price)
      .sort((a, b) => {
        const discountA = ((a.price - a.priceAfterDiscount) / a.price) * 100;
        const discountB = ((b.price - b.priceAfterDiscount) / b.price) * 100;
        return discountB - discountA;
      })
      .slice(0, 5);
  }

  // الحصول على أحدث المنتجات
  getLatestProducts() {
    return this.products
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }

  // الحصول على المنتجات الأكثر تقييماً
  getTopRatedProducts() {
    return this.products
      .filter(p => p.ratingsAverage > 0)
      .sort((a, b) => b.ratingsAverage - a.ratingsAverage)
      .slice(0, 5);
  }

  // توليد رد ذكي
  generateResponse(intent, message) {
    let response = {
      text: '',
      products: [],
      categories: [],
      brands: []
    };

    switch(intent) {
      case 'greetings':
        response.text = `أهلاً وسهلاً بك! 😊 أنا زحل AI، مساعدك الذكي في التسوق.
        
كيف يمكنني مساعدتك اليوم؟ يمكنني:
• 🛍️ عرض أحدث المنتجات والعروض
• 🔍 البحث عن منتجات محددة
• 📂 عرض التصنيفات المتاحة
• 🏷️ عرض الماركات المتوفرة
• 💰 مساعدتك في إيجاد أفضل الأسعار`;
        break;

      case 'products':
        const searchTerm = this.extractSearchTerm(message);
        if (searchTerm) {
          const foundProducts = this.searchProducts(searchTerm);
          if (foundProducts.length > 0) {
            response.text = `وجدت ${foundProducts.length} منتج يطابق بحثك عن "${searchTerm}" 🎯\n\n`;
            response.text += this.getRandomMarketingMessage();
            response.products = foundProducts.slice(0, 6);
          } else {
            response.text = `عذراً، لم أجد منتجات تطابق "${searchTerm}" 😔\n\nلكن لدينا منتجات رائعة أخرى قد تعجبك:`;
            response.products = this.getLatestProducts();
          }
        } else {
          response.text = `لدينا تشكيلة واسعة من المنتجات المميزة! 🌟\n\n`;
          response.text += this.getRandomMarketingMessage();
          response.products = this.getLatestProducts();
        }
        break;

      case 'categories':
        response.text = `لدينا ${this.categories.length} تصنيف متنوع يلبي جميع احتياجاتك! 📂\n\nاختر التصنيف المناسب لك:`;
        response.categories = this.categories.slice(0, 10);
        break;

      case 'brands':
        response.text = `نتعامل مع ${this.brands.length} ماركة عالمية ومحلية موثوقة! 🏆\n\nأشهر الماركات لدينا:`;
        response.brands = this.brands.slice(0, 10);
        break;

      case 'prices':
        const bestOffers = this.getBestOffers();
        if (bestOffers.length > 0) {
          response.text = `🔥 عروض حصرية لا تُفوت! خصومات تصل إلى 50%!\n\n`;
          response.text += `لدينا ${bestOffers.length} منتج بعروض مذهلة:`;
          response.products = bestOffers;
        } else {
          response.text = `جميع منتجاتنا بأسعار منافسة وجودة عالية! 💰\n\nتصفح منتجاتنا الأكثر مبيعاً:`;
          response.products = this.getTopRatedProducts();
        }
        break;

      case 'search':
        const searchQuery = this.extractSearchTerm(message);
        if (searchQuery) {
          const products = this.searchProducts(searchQuery);
          const categories = this.searchCategories(searchQuery);
          const brands = this.searchBrands(searchQuery);
          
          response.text = `نتائج البحث عن "${searchQuery}" 🔍\n\n`;
          
          if (products.length > 0) {
            response.text += `✅ وجدت ${products.length} منتج\n`;
            response.products = products.slice(0, 6);
          }
          if (categories.length > 0) {
            response.text += `✅ وجدت ${categories.length} تصنيف\n`;
            response.categories = categories;
          }
          if (brands.length > 0) {
            response.text += `✅ وجدت ${brands.length} ماركة\n`;
            response.brands = brands;
          }
          
          if (products.length === 0 && categories.length === 0 && brands.length === 0) {
            response.text = `لم أجد نتائج لـ "${searchQuery}" 😔\n\nجرب البحث بكلمات أخرى أو تصفح منتجاتنا المميزة:`;
            response.products = this.getLatestProducts();
          }
        } else {
          response.text = 'ما الذي تبحث عنه؟ يمكنني مساعدتك في إيجاد ما تريد! 🔍';
        }
        break;

      case 'help':
        response.text = `يمكنني مساعدتك في:

🛍️ **التسوق الذكي:**
• البحث عن منتجات محددة
• عرض أحدث المنتجات
• إيجاد أفضل العروض والخصومات

📊 **معلومات المتجر:**
• عرض جميع التصنيفات
• عرض الماركات المتوفرة
• معلومات عن الأسعار والعروض

💡 **نصائح:**
اكتب اسم المنتج الذي تبحث عنه وسأجده لك فوراً!
مثال: "أريد هاتف سامسونج" أو "أبحث عن لابتوب"`;
        break;

      case 'thanks':
        response.text = `العفو! سعيد بخدمتك 😊\n\nلا تتردد في السؤال عن أي شيء آخر. نحن هنا لنوفر لك أفضل تجربة تسوق!`;
        break;

      case 'bye':
        response.text = `وداعاً! سعدت بخدمتك 👋\n\nنتمنى أن تكون قد وجدت ما تبحث عنه. زيارتك القادمة ستكون أجمل!\n\n${this.getRandomMarketingMessage()}`;
        break;

      default:
        // محاولة البحث العام
        const generalSearch = this.searchProducts(message);
        if (generalSearch.length > 0) {
          response.text = `وجدت ${generalSearch.length} منتج قد يهمك! ✨`;
          response.products = generalSearch.slice(0, 6);
        } else {
          response.text = `أنا هنا لمساعدتك! 😊\n\nيمكنك أن تسألني عن:
• المنتجات المتوفرة
• التصنيفات والأقسام
• الماركات المتاحة
• العروض والخصومات

أو اكتب اسم المنتج الذي تبحث عنه مباشرة!`;
          response.products = this.getTopRatedProducts();
        }
    }

    return response;
  }

  // استخراج كلمة البحث من الرسالة
  extractSearchTerm(message) {
    // إزالة الكلمات الشائعة
    const stopWords = ['أريد', 'بدي', 'عاوز', 'ابحث', 'عن', 'في', 'من', 'الى', 'على', 'هل', 'يوجد', 'عندكم', 'لديكم'];
    
    let searchTerm = message;
    stopWords.forEach(word => {
      searchTerm = searchTerm.replace(new RegExp(word, 'gi'), '');
    });
    
    return searchTerm.trim();
  }

  // الحصول على رسالة تسويقية عشوائية
  getRandomMarketingMessage() {
    const randomIndex = Math.floor(Math.random() * this.marketingResponses.length);
    return this.marketingResponses[randomIndex];
  }

  // معالجة الرسالة الرئيسية
  async processMessage(message) {
    // استخدام محرك NLP للحصول على تحليل متقدم
    const nlpAnalysis = this.nlpEngine.processMessage(message, {
      products: this.products,
      categories: this.categories,
      brands: this.brands,
      hasDiscounts: this.getBestOffers().length > 0
    });
    
    // تحليل النية التقليدي كـ fallback
    const intent = nlpAnalysis.intent || this.analyzeIntent(message);
    
    // توليد الرد باستخدام كلا المحركين
    let response = this.generateResponse(intent, message);
    
    // دمج الرد البشري من محرك NLP
    if (nlpAnalysis.text && nlpAnalysis.sentiment.sentiment !== 'negative') {
      response.text = nlpAnalysis.text + "\n\n";
      
      // إضافة المنتجات/التصنيفات/الماركات المناسبة
      if (intent === 'products' || intent === 'search') {
        const searchResults = this.searchProducts(message);
        if (searchResults.length > 0) {
          response.products = searchResults.slice(0, 6);
        }
      }
    }
    
    // إضافة الاقتراحات السريعة
    response.suggestions = nlpAnalysis.suggestions;
    
    // إضافة تأخير طبيعي لمحاكاة التفكير البشري
    const thinkingTime = 300 + Math.random() * 500; // بين 300-800ms
    await new Promise(resolve => setTimeout(resolve, thinkingTime));
    
    return response;
  }
}

export default AIEngine;
