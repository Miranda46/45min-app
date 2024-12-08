import React, { useState, useEffect } from 'react';
import { 
  Home, 
  DollarSign, 
  MessageCircle, 
  User, 
  ArrowUpRight, 
  Mail, 
  Settings, 
  Lock, 
  Bell, 
  CreditCard,
  Send
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// Importing page components and mock data
import { translations, USER_DATA, SALES_CHART_DATA } from './data';

// Chat component
function ChatWindow({ chat, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "them" },
    { id: 2, text: "I'm interested in your products", sender: "me" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: "me" }]);
      setNewMessage("");
    }
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col">
      <div className="p-4 bg-teal-500 text-white flex items-center">
        <button onClick={onClose} className="mr-4">←</button>
        <div>
          <h2 className="font-bold">{chat.name}</h2>
          <p className="text-sm">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-3 rounded-lg ${
              message.sender === 'me' 
                ? 'bg-teal-500 text-white rounded-br-none' 
                : 'bg-gray-200 dark:bg-gray-700 rounded-bl-none'
            }`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 rounded-full border dark:border-gray-700 dark:bg-gray-900 dark:text-white mr-2"
          placeholder="Type a message..."
        />
        <button 
          onClick={sendMessage}
          className="p-2 bg-teal-500 text-white rounded-full"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

function ChatPage({ chats }) {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="p-4">
      <AnimatePresence>
        {selectedChat ? (
          <ChatWindow chat={selectedChat} onClose={() => setSelectedChat(null)} />
        ) : (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
          >
            <h1 className="text-2xl font-bold mb-4">Chats</h1>
            {chats.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => setSelectedChat(chat)}
                className={`p-3 border-b dark:border-gray-700 ${
                  chat.unread ? 'font-bold bg-teal-50 dark:bg-teal-900' : ''
                } cursor-pointer`}
              >
                <p className="font-semibold">{chat.name}</p>
                <p className="text-gray-600 dark:text-gray-400">{chat.lastMessage}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AccountSettingItem({ icon, text }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded">
      <div className="flex items-center">
        <span className="text-gray-600 dark:text-gray-300">{icon}</span>
        <span className="ml-3 text-gray-800 dark:text-white">{text}</span>
      </div>
      <ArrowUpRight size={20} className="text-teal-600 dark:text-teal-400" />
    </div>
  );
}

function HomePage({ userData, translations }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{translations.greeting}, {userData.name}!</h1>
      
      <div className="bg-teal-50 dark:bg-teal-900 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">{translations.monthlyEarnings}</h2>
        <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
          ${userData.monthlyEarnings.toFixed(2)}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">{translations.unreadMessages}</h2>
        {userData.unreadMessages.map(message => (
          <div 
            key={message.id} 
            className={`p-3 border-b dark:border-gray-700 ${
              message.unread ? 'font-bold bg-teal-50 dark:bg-teal-900' : ''
            }`}
          >
            <p>{message.sender}: {message.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MoneyPage({ salesData, translations }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{translations.salesOverview}</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-teal-50 dark:bg-teal-900 p-3 rounded">
          <p className="text-sm text-gray-600 dark:text-gray-400">{translations.totalSales}</p>
          <p className="text-xl font-bold">{salesData.thisMonth.totalSales}</p>
        </div>
        <div className="bg-teal-50 dark:bg-teal-900 p-3 rounded">
          <p className="text-sm text-gray-600 dark:text-gray-400">{translations.uniqueCustomers}</p>
          <p className="text-xl font-bold">{salesData.thisMonth.uniqueCustomers}</p>
        </div>
      </div>

      <div className="bg-teal-50 dark:bg-teal-900 p-3 rounded">
        <h2 className="text-lg font-semibold mb-2">{translations.salesTrend}</h2>
        <LineChart width={300} height={200} data={SALES_CHART_DATA}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#0d9488" strokeWidth={2} />
        </LineChart>
      </div>
    </div>
  );
}

function AccountPage({ userData, isDarkMode, setIsDarkMode, language, setLanguage, translations }) {
  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <img 
          src={userData.avatar} 
          alt="User Avatar" 
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h1 className="text-xl font-bold">{userData.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">{translations.personalAccount}</p>
        </div>
      </div>

      <div className="space-y-4">
        <AccountSettingItem icon={<User />} text={translations.editPersonalInfo} />
        <AccountSettingItem icon={<Bell />} text={translations.notificationSettings} />
        <AccountSettingItem icon={<Lock />} text={translations.privacySettings} />
        <AccountSettingItem icon={<CreditCard />} text={translations.monetizationSettings} />
        
        <div className="border-t dark:border-gray-700 pt-4">
          <h2 className="text-lg font-semibold mb-2">{translations.applicationSettings}</h2>
          <div className="flex justify-between items-center mb-2">
            <span>{translations.darkMode}</span>
            <input 
              type="checkbox" 
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
              className="toggle-checkbox"
            />
          </div>
          <div className="flex justify-between items-center">
            <span>{translations.language}</span>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="p-1 rounded dark:bg-gray-800 dark:text-white"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>

        <button className="w-full bg-red-500 text-white p-3 rounded mt-4">
          {translations.logOut}
        </button>
      </div>
    </div>
  );
}

export default function MobileCommerceApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const t = translations[language];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const pageVariants = {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '-100%' }
  };

  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ type: "tween", duration: 0.3 }}
        >
          {activeTab === 'home' && <HomePage userData={USER_DATA} translations={t} />}
          {activeTab === 'money' && <MoneyPage salesData={USER_DATA.salesData} translations={t} />}
          {activeTab === 'chat' && <ChatPage chats={USER_DATA.chats} translations={t} />}
          {activeTab === 'account' && (
            <AccountPage
              userData={USER_DATA}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              language={language}
              setLanguage={setLanguage}
              translations={t}
            />
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <main className="flex-grow overflow-hidden pb-16">
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-teal-500 dark:bg-teal-600 text-white py-2">
        <div className="flex justify-around items-center">
          {[
            { id: 'home', Icon: Home },
            { id: 'money', Icon: DollarSign },
            { id: 'chat', Icon: MessageCircle },
            { id: 'account', Icon: User }
          ].map(({ id, Icon }) => (
            <button 
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center ${activeTab === id ? 'text-white' : 'text-teal-200'}`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 capitalize">{id}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
