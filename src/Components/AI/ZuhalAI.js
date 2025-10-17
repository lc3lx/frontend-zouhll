import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FiMessageSquare, FiX, FiSend, FiShoppingCart, FiTag, FiBox } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './ZuhalAI.css';
import AIEngine from './AIEngine';

const ZuhalAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'مرحباً! أنا زحل AI 🤖 مساعدك الذكي في التسوق. كيف يمكنني مساعدتك اليوم؟',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [quickActions, setQuickActions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // جلب البيانات من Redux
  const products = useSelector(state => state.allproducts.allProducts);
  const categories = useSelector(state => state.allCategory.category);
  const brands = useSelector(state => state.allBrand.brand);

  // تهيئة محرك الذكاء الاصطناعي
  const aiEngine = new AIEngine(products, categories, brands);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setQuickActions(false);

    // محاولة استخدام خادم Flask أولاً ثم العودة للمحرك المحلي
    try {
      const payload = { message: userMessage.text };

      const tryEndpoints = async () => {
        const endpoints = [
          'https://www.zuhall.com/api/ai/chat', // تطوير محلي Flask
         
        ];
        for (const url of endpoints) {
          try {
            const res = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });
            if (res.ok) return await res.json();
          } catch (_) { /* جرب التالي */ }
        }
        return null;
      };

      const serverRes = await tryEndpoints();
      let response = serverRes && serverRes.text ? serverRes : await aiEngine.processMessage(inputMessage);

      const botMessage = {
        type: 'bot',
        text: response.text,
        products: response.products,
        categories: response.categories,
        brands: response.brands,
        suggestions: response.suggestions,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      if (response.suggestions && response.suggestions.length > 0) setQuickActions(true);
    } catch (err) {
      const response = await aiEngine.processMessage(inputMessage);
      const botMessage = {
        type: 'bot',
        text: response.text,
        products: response.products,
        categories: response.categories,
        brands: response.brands,
        suggestions: response.suggestions,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      if (response.suggestions && response.suggestions.length > 0) setQuickActions(true);
    }
  };

  const handleQuickAction = (action) => {
    setInputMessage(action);
    handleSendMessage();
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Floating Button */}
      <div 
        className={`zuhal-ai-button ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <div className="zuhal-ai-button-icon">
          <FiMessageSquare size={24} />
        </div>
        <div className="zuhal-ai-button-pulse"></div>
        <div className="zuhal-ai-button-badge">زحل AI</div>
      </div>

      {/* Chat Window */}
      <div className={`zuhal-ai-chat ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="zuhal-ai-header">
          <div className="zuhal-ai-header-info">
            <div className="zuhal-ai-avatar">
              <span>🤖</span>
            </div>
            <div>
              <div className="zuhal-ai-title">زحل AI</div>
              <div className="zuhal-ai-status">
                <span className="zuhal-ai-status-dot"></span>
                متصل الآن
              </div>
            </div>
          </div>
          <button 
            className="zuhal-ai-close"
            onClick={() => setIsOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="zuhal-ai-messages">
          {messages.map((message, index) => (
            <div key={index} className={`zuhal-ai-message ${message.type}`}>
              <div className="zuhal-ai-message-content">
                <div className="zuhal-ai-message-text">
                  {message.text}
                </div>
                
                {/* عرض المنتجات المقترحة */}
                {message.products && message.products.length > 0 && (
                  <div className="zuhal-ai-products">
                    <div className="zuhal-ai-products-title">💎 منتجات مقترحة:</div>
                    <div className="zuhal-ai-products-grid">
                      {message.products.slice(0, 3).map((product, idx) => (
                        <Link 
                          key={idx} 
                          to={`/products/${product._id}`}
                          className="zuhal-ai-product-card"
                          onClick={() => setIsOpen(false)}
                        >
                          <img src={product.imageCover} alt={product.title} />
                          <div className="zuhal-ai-product-info">
                            <div className="zuhal-ai-product-title">{product.title}</div>
                            <div className="zuhal-ai-product-price">${product.price}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* عرض التصنيفات */}
                {message.categories && message.categories.length > 0 && (
                  <div className="zuhal-ai-categories">
                    <div className="zuhal-ai-categories-title">📂 التصنيفات:</div>
                    <div className="zuhal-ai-categories-list">
                      {message.categories.map((category, idx) => (
                        <Link
                          key={idx}
                          to={`/products/category/${category._id}`}
                          className="zuhal-ai-category-chip"
                          onClick={() => setIsOpen(false)}
                        >
                          <FiTag size={14} />
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* عرض الماركات */}
                {message.brands && message.brands.length > 0 && (
                  <div className="zuhal-ai-brands">
                    <div className="zuhal-ai-brands-title">🏷️ الماركات:</div>
                    <div className="zuhal-ai-brands-list">
                      {message.brands.map((brand, idx) => (
                        <Link
                          key={idx}
                          to={`/products/brand/${brand._id}`}
                          className="zuhal-ai-brand-chip"
                          onClick={() => setIsOpen(false)}
                        >
                          {brand.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="zuhal-ai-message-time">
                  {formatTime(message.timestamp)}
                </div>
                
                {/* عرض الاقتراحات الديناميكية */}
                {message.suggestions && message.suggestions.length > 0 && index === messages.length - 1 && (
                  <div className="zuhal-ai-dynamic-suggestions">
                    <div className="zuhal-ai-suggestions-title">💡 اقتراحات سريعة:</div>
                    <div className="zuhal-ai-suggestions-chips">
                      {message.suggestions.slice(0, 3).map((suggestion, idx) => (
                        <button
                          key={idx}
                          className="zuhal-ai-suggestion-chip"
                          onClick={() => handleQuickAction(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="zuhal-ai-message bot">
              <div className="zuhal-ai-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {quickActions && !isTyping && (
            <div className="zuhal-ai-quick-actions">
              <div className="zuhal-ai-quick-title">اختر سؤال سريع:</div>
              <div className="zuhal-ai-quick-buttons">
                <button onClick={() => handleQuickAction('ما هي أحدث المنتجات؟')}>
                  <FiBox /> أحدث المنتجات
                </button>
                <button onClick={() => handleQuickAction('أريد منتجات بأفضل الأسعار')}>
                  <FiShoppingCart /> أفضل العروض
                </button>
                <button onClick={() => handleQuickAction('ما هي التصنيفات المتاحة؟')}>
                  <FiTag /> التصنيفات
                </button>
                <button onClick={() => handleQuickAction('أبحث عن هواتف ذكية')}>
                  📱 هواتف ذكية
                </button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="zuhal-ai-input">
          <input
            ref={inputRef}
            type="text"
            placeholder="اكتب رسالتك هنا..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button 
            className="zuhal-ai-send"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ZuhalAI;
