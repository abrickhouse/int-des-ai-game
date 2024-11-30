import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faSeedling } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const App = () => {
 const [money, setMoney] = useState(50);
 const [environment, setEnvironment] = useState(50);
 const [currentStep, setCurrentStep] = useState(0);

 const scens = [
  {
   id: 1,
   title: "Data Centers",
   prompt:
    "Your AI company has been growing rapidly, and clients are demanding more powerful machine learning models. To meet this demand, you're considering expanding your data center infrastructure. This would involve building new data centers that consume significant amounts of energy and contribute to carbon emissions, particularly if the energy comes from fossil fuels. The company is also facing pressure to keep operational costs low and maintain a competitive edge.",
   c1: "Go Ahead with Expansion",
   rE: -10,
   rM: -5,
   c2: "Postpone Expansion, Invest in Renewable Energy",
   rE2: 10,
   rM2: -10,
   next1: 2,
   next2: 2,
  },
  {
   id: 2,
   title: "Data Sourcing",
   prompt:
    "Your company is developing a new AI model that will require vast amounts of data to train. To improve accuracy and capabilities, you need access to high-quality datasets, but many of these datasets are being sourced from cloud platforms or third-party providers that use significant resources in data collection, storage, and processing. There's a concern that continuing with these practices will further harm the environment through unnecessary energy consumption.",
   c1: "Use the Most Efficient Dataset Providers",
   rE: -10,
   rM: 0,
   c2: "Build Your Own Dataset Infrastructure with Sustainable Practices",
   rE2: 0,
   rM2: -10,
   next1: 3,
   next2: 3,
  },
  {
   id: 3,
   title: "AI Model Training Techniques",
   prompt:
    "Your company is about to begin training a large-scale deep learning model that will push the boundaries of artificial intelligence. This model requires immense computational resources, leading to high energy consumption and significant carbon emissions. One option is to optimize the model to use fewer resources (using techniques like pruning, quantization, or more efficient architectures), but this might result in slightly lower accuracy. Another option is to go for maximum performance, which will demand even more energy.",
   c1: "Maximize Model Performance",
   rE: -10,
   rM: 0,
   c2: "Optimize for Sustainability",
   rE2: -5,
   rM2: -5,
   next1: 4,
   next2: 4,
  },
  {
   id: 4,
   title: "Supply Chain and Raw Material Sourcing",
   prompt:
    "Your AI company relies on advanced hardware—such as specialized GPUs and other semiconductor components—to run your AI models. These materials require mining and manufacturing processes that are resource-intensive and often harmful to the environment. You are now faced with a choice of whether to source your hardware from companies with questionable environmental practices or invest in alternatives that are more sustainable but may be more expensive.",
   c1: "Source from Traditional Suppliers",
   rE: -10,
   rM: -5,
   c2: "Invest in Sustainable Hardware and Ethical Suppliers",
   rE2: 10,
   rM2: -10,
   next1: 5,
   next2: 5,
  },
  {
   id: 5,
   title: "Advertising",
   prompt:
    "The criticism that the company is getting online from environmental activists is concerning your investors. An employee suggests putting out an advertising campaign to rehabilitate the company’s image, but this will cost a lot of money. Do you create an ad campaign to assuage consumer concerns?",
   c1: "Advertise",
   rE: 0,
   rM: -5,
   c2: "Wait out the ‘Woke Mob’",
   rE2: 0,
   rM2: -10,
   next1: 6,
   next2: 7,
  },
  {
   id: 6,
   title: "Tech Conference",
   prompt:
    "As the usage of AI within big tech corporations increase, you have been asked to speak at the Leaders in Tech Conference about the future of AI and business. Shareholders have polarizing opinions on how important the company’s ESG report is and want to know your stance on AI’s prolonged environmental impact.",
   c1: "Support ESG Report",
   rE: 30,
   rM: -5,
   c2: "Ignore Environmental Concerns",
   rE2: -15,
   rM2: 5,
   next1: 9,
   next2: 8,
  },
  {
   id: 7,
   title: "Chatbots",
   prompt:
    "You’ve seen other websites use chatbots to help customers navigate their websites. Do you choose to add a chatbot to your company’s website?",
   c1: "Use Chatbots to Assist Users",
   rE: -10,
   rM: -5,
   c2: "Do Not Use Chatbots",
   rE2: 0,
   rM2: 0,
   next1: 9,
   next2: 10,
  },
  {
   id: 8,
   title: "New Friends",
   prompt:
    "After debunking claims related to AI’s environmental impact at the Leaders in Tech Conference, Tesla’s CEO Elon Musk has taken an interest in your company. Tesla is one of the biggest tech companies and a relationship like this could boost profit. Do you decide to partner your company with Tesla? Be mindful how connections to a controversial CEO might conflict with your brand.",
   c1: "Partner with Tesla",
   rE: -10,
   rM: 15,
   c2: "Reject Offer",
   rE2: 0,
   rM2: -5,
   next1: 10,
   next2: 10,
  },
  {
   id: 9,
   title: "Carbon Offsetting vs. Reducing Emissions",
   prompt:
    "Your company is exploring options for reducing its environmental impact, especially in terms of carbon emissions. Carbon offsetting (e.g., investing in tree planting or renewable energy projects) is one option to mitigate the environmental harm from your operations. However, there are also internal practices you could implement to directly reduce your own emissions, such as energy efficiency improvements or reducing office space.",
   c1: "Invest in Carbon Offsets",
   rE: 0,
   rM: -5,
   c2: "Reduce Carbon Emissions Directly",
   rE2: 10,
   rM2: -10,
   next1: 10,
   next2: 10,
  },
  {
   id: 10,
   title: "Employee Travel and Remote Work",
   prompt:
    "As the CEO of an AI company, you know that employee travel—particularly flights for conferences, meetings, or sales visits—can contribute significantly to your carbon footprint. Many of your employees have expressed that they prefer working remotely, which could reduce the need for travel, but your business model is built on frequent in-person interactions to foster innovation and collaboration. You're now considering whether to limit travel or continue with the traditional model.",
   c1: "Maintain Traditional Office-Based Work Culture",
   rE: -10,
   rM: 5,
   c2: "Embrace Remote Work and Cut Back on Travel",
   rE2: 10,
   rM2: -5,
   next1: 11,
   next2: 11,
  },
  {
   id: 11,
   title: "Designers",
   prompt:
    "You’re contemplating joining in on the trend of using AI to design your company’s graphics. The company’s current design team of 3 employees produces content a week slower than AI could and they require an annual salary of $60,000. You can keep your current design team at higher cost or try out using AI to drive your design.",
   c1: "Keep Design Team",
   rE: 5,
   rM: -5,
   c2: "Replace Design Team",
   rE2: -10,
   rM2: -10,
   next1: 12,
   next2: 17,
  },
  {
   id: 12,
   title: "AI Model Accessibility and Environmental Justice",
   prompt:
    "Your AI company has developed a highly advanced model that can be used in various sectors, from healthcare to finance. However, the resources required to train and deploy such a model are enormous, and the cost of accessing it is likely to put it out of reach for smaller organizations or those in developing countries. You have the opportunity to make the model accessible to a wider range of users, but doing so may increase your environmental impact.",
   c1: "Limit Access to High-Value Clients",
   rE: 10,
   rM: 10,
   c2: "Make the Model More Accessible to Smaller Clients and Developing Countries",
   rE2: -20,
   rM2: 20,
   next1: 13,
   next2: 14,
  },
  {
   id: 13,
   title: "AI for Climate Change Solutions",
   prompt:
    "Your company has the opportunity to develop a groundbreaking AI tool that could help governments and organizations predict and mitigate the impacts of climate change, such as flooding, droughts, or extreme weather events. However, this project is not very profitable in the short term, and it's a large-scale investment. There’s also the risk that the AI model may not deliver the expected results, leaving your company financially vulnerable.",
   c1: "Pursue the AI Climate Change Tool",
   rE: 10,
   rM: -10,
   c2: "Focus on More Profitable AI Projects",
   rE2: 0,
   rM2: 5,
   next1: 16,
   next2: 18,
  },
  {
   id: 14,
   title: "Environmental Disaster",
   prompt:
    "A catastrophic environmental disaster has struck, leaving major parts of the world uninhabitable due to rising sea levels and toxic air pollution. Your company’s AI technologies are among the most advanced tools available to assist with relief and mitigation efforts, but deploying them at scale would drain the company's financial reserves. Alternatively, you could leverage your tech to create luxury havens for the wealthy, ensuring profit but limiting who you help.",
   c1: "Deploy AI for Global Relief Efforts",
   rE: 10,
   rM: -20,
   c2: "Focus on Luxury Solutions for Profit",
   rE2: -5,
   rM2: 10,
   next1: 20,
   next2: 18,
  },
  {
   id: 15,
   title: "Bankruptcy",
   prompt:
    "Years of rapid expansion and cutthroat competition have drained your company’s finances. You're on the verge of bankruptcy unless you take drastic action. A venture capitalist offers a lifeline but demands full control over your R&D pipeline, potentially diverting your tech into controversial or unethical applications. Alternatively, you could attempt an unprecedented company-wide restructuring, cutting jobs and reducing services.",
   c1: "Accept the Venture Capitalist’s Offer",
   rE: -10,
   rM: 20,
   c2: "Restructure and Downsize",
   rE2: -5,
   rM2: 10,
   next1: 19,
   next2: 18,
  },
  {
   id: 16,
   title: "Environmental Utopia",
   prompt:
    "Decades of investment in sustainable AI applications have transformed the world into a near-utopia, with green energy and conservation at the forefront. Your company has been a key player in this transformation, but rivals are beginning to undermine your market share by offering cheap, less eco-conscious solutions. Do you double down on innovation or spend resources lobbying governments to enforce eco-friendly practices globally?",
   c1: "Invest in Green Innovation",
   rE: 5,
   rM: -10,
   c2: "Lobby for Government Regulations",
   rE2: 10,
   rM2: -15,
   next1: 20,
   next2: 20,
  },
  {
   id: 17,
   title: "Machines Replacing Humans",
   prompt:
    "Automation has taken over nearly all industries, leading to unprecedented economic efficiency but at a devastating environmental cost. The energy demands of running fully automated systems, powered by your AI technology, have escalated to unsustainable levels. Forests are being cleared to make way for data centers, and rare earth mining has destroyed ecosystems. Activists demand that your company scale back its operations and invest in eco-friendly infrastructure, but doing so would jeopardize your dominance in the AI industry. Alternatively, you could double down on current practices to maintain market supremacy, betting on future technological breakthroughs to solve the crisis.",
   c1: "Scale Back and Transition to Eco-Friendly Operations",
   rE: 5,
   rM: -15,
   c2: "Double Down on Expansion and Automation",
   rE2: -10,
   rM2: 20,
   next1: 18,
   next2: 15,
  },
  {
   id: 18,
   title: "NEUTRAL ENDING",
   prompt: "",
   c1: "",
   rE: 0,
   rM: 0,
   c2: "",
   rE2: 0,
   rM2: 0,
   next1: 18,
   next2: 18,
  },
  {
   id: 19,
   title: "ENVIRONMENTAL COLLAPSE",
   prompt: "",
   c1: "",
   rE: 0,
   rM: 0,
   c2: "",
   rE2: 0,
   rM2: 0,
   next1: 19,
   next2: 19,
  },
  {
   id: 20,
   title: "ENVIRONMENT THRIVES",
   prompt: "",
   c1: "",
   rE: 0,
   rM: 0,
   c2: "",
   rE2: 0,
   rM2: 0,
   next1: 20,
   next2: 20,
  },
  {
   id: 21,
   title: "COMPANY SHUT DOWN",
   prompt: "",
   c1: "",
   rE: 0,
   rM: 0,
   c2: "",
   rE2: 0,
   rM2: 0,
   next1: 21,
   next2: 21,
  },
 ];

 const handleChoice = (choice) => {
  if (choice === "option1") {
   // c1, rE, rM, next1
   setMoney(money + scens[currentStep - 1].rM);
   setEnvironment(environment + scens[currentStep - 1].rE);
   setCurrentStep(scens[currentStep - 1].next1);
  } else if (choice === "option2") {
   // c2, rE2, rM2, next2
   setMoney(money + scens[currentStep - 1].rM2);
   setEnvironment(environment + scens[currentStep - 1].rE2);
   setCurrentStep(scens[currentStep - 1].next2);
  }
  if (environment <= 0) {
   setCurrentStep(19);
  } else if (money <= 0) {
   setCurrentStep(21);
  }
 };
 const restartGame = () => {
  setMoney(50);
  setEnvironment(50);
  setCurrentStep(0);
 };
 const renderGameStep = () => {
  switch (currentStep) {
   case 0:
    return (
     <div className="p-5">
      <h3 className="pixelify-sans-head">Welcome to AITech!</h3>
      <p>
       AITech is an up and coming player in the AI arena. We’ve chosen you to
       guide our company into the future, but there are a few details we need
       you to settle first...
      </p>
      <button className="btn button" onClick={() => setCurrentStep(1)}>
       Begin
      </button>
     </div>
    );
   case 1:
   case 2:
   case 3:
   case 4:
   case 5:
   case 6:
   case 7:
   case 8:
   case 9:
   case 10:
   case 11:
   case 12:
   case 13:
   case 14:
   case 15:
   case 16:
   case 17:
    return (
     <div className="p-5">
      <h4 className="pixelify-sans-head">{scens[currentStep - 1].title}</h4>
      <p>{scens[currentStep - 1].prompt}</p>
      <button className="btn button" onClick={() => handleChoice("option1")}>
       {scens[currentStep - 1].c1}
      </button>
      <button className="btn button" onClick={() => handleChoice("option2")}>
       {scens[currentStep - 1].c2}
      </button>
     </div>
    );
   case 18:
   case 19:
   case 20:
   case 21:
    return (
     <div className="p-5">
      <h3 className="pixelify-sans-head">Game Over!</h3>
      <h3 className="pixelify-sans-head color">
       {scens[currentStep - 1].title}
      </h3>
      <br />
      <p>blah blah blah</p>

      <button className="btn  button" onClick={restartGame}>
       Restart
      </button>
     </div>
    );
   default:
    return (
     <div className="pixelify-sans-head">
      Something went wrong...
      <br />
      <button className="btn  button" onClick={restartGame}>
       Restart
      </button>
     </div>
    );
  }
 };

 return (
  <div className="my-4 px-5">
   {renderGameStep()}
   <br />
   <FontAwesomeIcon
    className="down"
    transform="left-5 down-30"
    icon={faDollarSign}
   />
   <div className="progress my-1 mx-4">
    <div
     className="progress-bar progress-bar-animated cash"
     role="progressbar"
     style={{ width: `${money}%` }}
     aria-valuenow={money}
     aria-valuemin="0"
     aria-valuemax="100"
    ></div>
   </div>
   <FontAwesomeIcon
    className="down"
    transform="left-6 down-30"
    icon={faSeedling}
   />
   <div className=" progress my-1 mx-4">
    <div
     className="progress-bar progress-bar-animated env"
     role="progressbar"
     style={{ width: `${environment}%` }}
     aria-valuenow={environment}
     aria-valuemin="0"
     aria-valuemax="100"
    ></div>
   </div>
  </div>
 );
};

export default App;
