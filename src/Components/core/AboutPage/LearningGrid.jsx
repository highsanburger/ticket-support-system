import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import CTAButton from "../../core/HomePage/Button";

const LearningGridArray = [
    {
      order: -1,
      heading: "Meet the Team Behind",
      
      highlightText: "   Ticket Care",
      description:
        "Behind the success of Ticket Care is a team of passionate individuals dedicated to shaping the future of customer support",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Nitin Kumar Jha",
      description:
        "Nitin has been the driving force behind Ticket Care, taking charge of building the core functionalities. He's responsible for the development of the login and signup backend.",
    },
    {
      order: 2,
      heading: "Md Faizan",
      description:
        "Md Faizan is the creative mind responsible for the intuitive interface that allows clients to effortlessly raise their tickets",
    },
    {
      order: 3,
      heading: "Mihir Biswas",
      description:
        "Mihir Biswas has built the   functionality of view ticket page on both the client and admin sides.",
    },
    {
      order: 4,
      heading: `Syed Khalid`,
      description:
        "Syed Khalid specializes in backend development, playing a crucial role in building the backend infrastructure for both the client and admin sides of Ticket Care",
    },
    {
      order: 5,
      heading: "Thulasi Mahesh",
      description:
        "Thulasi Mahesh has played a key role in shaping the client-side experience of Ticket Care.",
    },
  ];


const LearningGrid = () => {
  return (
    <div className='grid  grid-col-1 lg:grid-cols-4 mb-10 p-5 lg:w-fit'>
    {
        LearningGridArray.map( (card, index) => {
            return (
                <div
                key={index}
                className={`${index === 0 && "lg:col-span-2 lg:h-[280px] p-5"}
                ${
                    card.order % 2 === 1 ? "bg-richblack-700 lg:h-[280px] p-5" : "bg-richblack-800 lg:h-[280px] p-5"
                }
                ${card.order === 3 && "lg:col-start-2"}
                ${card.order < 0 && "bg-transparent"}
                `}
                >
                {
                    card.order < 0 
                    ? (
                        <div className='lg:w-[90%] flex flex-col pb-5 gap-3'>
                            <div className='text-4xl font-semibold'>
                                {card.heading}
                                <HighlightText text={card.highlightText} />
                            </div>
                            <p className='font-medium'>
                                {card.description}
                            </p>
                            <div className='w-fit mt-4'>
                                <CTAButton active={true} linkto={card.BtnLink}>
                                    {card.BtnText}
                                </CTAButton>
                            </div>
                        </div>
                    )
                    : (<div className='flex flex-col gap-8 p-7'>
                        <h1 className='text-richblack-5 text-lg'>
                            {card.heading}
                        </h1>
                        <p className='text-richblack-300 font-medium'>
                            {card.description}
                        </p>
                    </div>)
                }

                </div>
            )
        } )
    } 
    </div>
  )
}

export default LearningGrid
