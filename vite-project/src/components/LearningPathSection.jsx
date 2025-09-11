import React, { useEffect, useState } from 'react';
import LearningPathCard from '../components/LearningPathCard';

const LearningPathSection = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/cards/getcard')
      .then(res => res.json())
      .then(data => {
        setCards(data);
      })
      .catch(err => console.error("Error fetching cards:", err));
  }, []);

  return (
    <section id="learning-path-section" className="relative h-[full] overflow-hidden bg-transparent text-black px-4 py-20 md:py-28">
      <div className="max-w-7xl mx-auto ">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-20 text-center">
          Choose a Learning Path
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.filter(item=>item && item.title).map((item, index) => (
            <div
              key={item._id}
              className="bg-gray-900 rounded-xl text-black shadow-lg hover:shadow-2xl transition duration-300 p-2 md:p-6"
            >
              <LearningPathCard
                title={item.title}
                description={item.description}
                slug={item.slug}
                buttonText={item.buttonText}
                onClick={() => console.log(`Clicked ${item.title}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPathSection;