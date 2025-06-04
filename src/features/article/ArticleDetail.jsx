import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';

const ArticleDetail = () => {
  const { articleId } = useParams(); 

  const ArticleContent = { // masih dummy
    title: `Sculpt Your Physique: A Comprehensive Guide to Lowering Body Fat Percentage ${articleId.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`,
    fullContent: `Ini adalah konten lengkap untuk artikel dengan ID "${articleId}". Di sini Anda akan menemukan informasi mendalam tentang topik ini. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    category: "Health Basics",
    author: "Weightly Team",
    date: "June 2nd, 2025"
  };

  return (
    <div className="space-y-6">
      <div className='font-poppins p-3'>
          <h1 className="text-3xl font-bold mb-4">{ArticleContent.title}</h1>
          <div className="text-sm text-gray-500 mb-4">
            <p>Category: <span className="font-medium text-blue-600">{ArticleContent.category}</span></p>
            <p>By {ArticleContent.author} on {ArticleContent.date}</p>
          </div>
          <div className='text-align'>
            <p className="text-gray-800">
              {ArticleContent.fullContent}
            </p>
          </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
