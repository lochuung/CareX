import React from "react";
import { Button, Card } from 'antd';
import yoga2 from '/yoga2.png';
import { FaRegHandPointLeft, FaRegHandPointRight  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"

const HomePage = () => {
  const navigate = useNavigate();
  const CardHover = [
    {
      title: 'Yoga Exercise',
      description: 'We have a lot of yoga exercise for you. You will learn one by one each level',
      image: 'https://images.everydayhealth.com/images/healthy-living/fitness/all-about-yoga-mega-722x406.jpg',
      path: '/yoga'
    },
    {
      title: 'BMI Calculator',
      description: 'We will calculate your BMI by your infomation you provide for us(Eg: Age, Gender, Weight, Height,..)',
      image: 'https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2020/08/bmi-1.jpg',
      path: '/bmiresult'
    },
    {
      title: 'Food Recommedation', 
      description: 'CareX will generate  many kind of foods for Breakfast, Lunch and Dinner that will have you balance your calories',
      image: 'https://static01.nyt.com/images/2019/02/28/opinion/28yun/28yun-facebookJumbo.jpg?year=2019&h=550&w=1050&s=82fdfc94f25e04c4accc63a2a2777306b7d82ee86a5c0b859aaca92502845750&k=ZQJBKqZ0VN',
      path: '/diet'
    },
    {
      title: 'Workshop', 
      description: 'We always have many workshop every week or month. Come and join with us to know more about health and yoga',
      image: 'https://roruconcept.com/cdn/shop/files/RORU_WEBSITE_BANNER_03_a8b4dcb4-dd29-4916-9334-4aa756144cd1_1500x.jpg?v=1712131857',
      path: '/workshop'
    },

  ]
  const variantContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1 ,
      transition: {
        staggerChildren: 0.25,
      }
    },
  }
  const variantCard = {
    hidden: { opacity: 0 },
    show: { opacity: 1}
  }

  const { Meta } = Card;
  return (
    <section className="w-full h-screen space-y-6 bg-hero-pattern bg-no-repeat object-cover">
      <div className="flex justify-center">
        <h1 className="text-5xl font-bold">Care<span className="text-blue-600">X</span></h1>
      </div>
      <motion.div className="flex flex-row gap-2 justify-center items-center">
        <motion.div variants={variantContainer} initial="hidden" animate="show" className="w-3/6 text-center">
          <motion.p variants={variantCard} className="text-3xl font-bold bg-white">Take Health Into Your Own Hands</motion.p>
          <motion.p variants={variantCard} className="pt-2 text-lg bg-slate-100">When you maintain good health, everything else falls into place.</motion.p>
          <motion.div variants={variantCard} className="pt-6 space-y-4">
            <motion.p variants={variantCard}className="text-center bg-white italic">Let we see how good is your health by clicking the below button</motion.p>
            <motion.div variants={variantCard}className="flex justify-center flex-row space-x-4 items-center">
              <div className="space-x-4">
              <Button type='primary' danger className="font-bold text-base" onClick={() => navigate('/bmiresult')}>Check your BMI</Button>
              <Button className="font-bold text-base" onClick={() => navigate('/yoga')}>Practice Yoga</Button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
          <motion.div variants={variantCard} >
            <img src={yoga2} alt="" width={800} height={500} className="rounded-md"/>
          </motion.div>
      </motion.div>
      <div className="pt-10 flex flex-col justify-center space-y-8">
        <div className="text-center">
          <p className="text-2xl font-bold">What should we help you?</p>
        </div>
        <div className="flex flex-rol gap-3 justify-around">
        {
          CardHover.map((item) => {
            var path = item.path
            return (
              <Card
              hoverable
              style={{ width: 250 }}
              cover={
                <div className="max-h-[200px]">
                  <img
                  alt="example"
                  src={item.image}
                />
                </div>
              }
              onClick={() => navigate(path)}
        >
          <Meta
            title={item.title}
            description={item.description}
          />
        </Card>
            )
          })
        }
        </div>
      </div>
    </section>
  )
};

export default HomePage;
