import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FiMessageSquare, FiX, FiSend } from "react-icons/fi";
import "./ZuhalAI.css";
import AIEngine from "./AIEngine";

const ZuhalAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "مرحباً! أنا زحل AI 🤖 مساعدك الذكي في التسوق. كيف يمكنني مساعدتك اليوم؟",
      timestamp: new Date(),
    },
  ]);
  const [flaskAIStatus, setFlaskAIStatus] = useState("checking"); // checking, available, unavailable
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // جلب البيانات من Redux
  const products = useSelector((state) => state.allproducts.allProducts);
  const categories = useSelector((state) => state.allCategory.category);
  const brands = useSelector((state) => state.allBrand.brand);

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
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: "user",
      text: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // محاولة استخدام خادم Flask أولاً ثم العودة للمحرك المحلي
    try {
      const payload = {
        message: userMessage.text,
        session_id: "zuhal_ai_" + Date.now(), // إضافة session ID للسياق
        history: messages.slice(-6).map((msg) => ({
          type: msg.type,
          text: msg.text,
        })),
      };

      const tryEndpoints = async () => {
        const endpoints = [
          "http://localhost:3001/api/ai/chat", // Flask AI محلي
          "https://www.zuhall.com/api/ai/chat", // Flask AI على السيرفر
        ];

        for (const url of endpoints) {
          try {
            console.log(`محاولة الاتصال بـ: ${url}`);

            // إضافة timeout للاتصال
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 ثواني timeout

            const res = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "User-Agent": "ZuhalAI-Frontend/1.0",
              },
              body: JSON.stringify(payload),
              signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (res.ok) {
              const data = await res.json();
              console.log("✅ استجابة من Flask AI:", data);
              return data;
            } else {
              console.log(
                `❌ فشل الاتصال بـ ${url}: ${res.status} ${res.statusText}`
              );
              // إذا كان الخطأ 404 أو 400، جرب endpoint آخر
              if (res.status === 404 || res.status === 400) {
                console.log(`🔄 محاولة endpoint آخر...`);
                continue;
              }
            }
          } catch (error) {
            if (error.name === "AbortError") {
              console.log(`⏰ انتهت مهلة الاتصال بـ ${url}`);
            } else {
              console.log(`❌ خطأ في الاتصال بـ ${url}:`, error.message);
            }
          }
        }
        return null;
      };

      const serverRes = await tryEndpoints();
      let response;

      if (serverRes && serverRes.text) {
        // استخدام استجابة Flask AI
        response = {
          text: serverRes.text,
          products: serverRes.products || [],
          categories: serverRes.categories || [],
          brands: serverRes.brands || [],
          suggestions: serverRes.suggestions || [],
          source: "flask_ai", // إضافة مصدر الرد
          context: serverRes.context || null,
        };
        console.log("✅ تم استخدام Flask AI بنجاح");
        setFlaskAIStatus("available");
      } else {
        // العودة للمحرك المحلي
        console.log("🔄 استخدام المحرك المحلي كـ fallback");
        console.log("ℹ️ Flask AI غير متاح، استخدام المحرك المحلي");
        setFlaskAIStatus("unavailable");
        response = await aiEngine.processMessage(inputMessage);
        response.source = "local_engine"; // إضافة مصدر الرد
      }

      const botMessage = {
        type: "bot",
        text: response.text,
        products: response.products,
        categories: response.categories,
        brands: response.brands,
        suggestions: response.suggestions,
        source: response.source, // إضافة مصدر الرد
        context: response.context,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    } catch (err) {
      const response = await aiEngine.processMessage(inputMessage);
      const botMessage = {
        type: "bot",
        text: response.text,
        products: response.products,
        categories: response.categories,
        brands: response.brands,
        suggestions: response.suggestions,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* Floating Button */}
      <div
        className={`zuhal-ai-button ${isOpen ? "hidden" : ""}`}
        onClick={() => setIsOpen(true)}
      >
        <div className="zuhal-ai-button-icon">
          <FiMessageSquare size={24} />
        </div>
        <div className="zuhal-ai-button-pulse"></div>
        <div className="zuhal-ai-button-badge">زحل AI</div>
      </div>

      {/* Chat Window */}
      <div className={`zuhal-ai-chat ${isOpen ? "open" : ""}`}>
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
              {/* مؤشر حالة Flask AI */}
              {flaskAIStatus === "available" && (
                <div className="zuhal-ai-status-available">
                  🤖 AI الذكي متاح
                </div>
              )}
              {flaskAIStatus === "unavailable" && (
                <div className="zuhal-ai-status-unavailable">⚡ وضع محلي</div>
              )}
              {flaskAIStatus === "checking" && (
                <div className="zuhal-ai-status-checking">
                  🔄 فحص الاتصال...
                </div>
              )}
            </div>
          </div>
          <button className="zuhal-ai-close" onClick={() => setIsOpen(false)}>
            <FiX size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="zuhal-ai-messages">
          {messages.map((message, index) => (
            <div key={index} className={`zuhal-ai-message ${message.type}`}>
              <div className="zuhal-ai-message-content">
                <div className="zuhal-ai-message-text">{message.text}</div>

                {/* مؤشر مصدر الرد */}
                {message.source && (
                  <div className="zuhal-ai-message-source">
                    {message.source === "flask_ai" ? (
                      <span className="zuhal-ai-source-flask">
                        🤖 زحل AI الذكي
                      </span>
                    ) : (
                      <span className="zuhal-ai-source-local">
                        ⚡ محرك محلي
                      </span>
                    )}
                  </div>
                )}

                <div className="zuhal-ai-message-time">
                  {formatTime(message.timestamp)}
                </div>
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
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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
