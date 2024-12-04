import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faDollarSign,
 faSeedling,
 faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const App = () => {
 const [money, setMoney] = useState(60);
 const [environment, setEnvironment] = useState(60);
 const [currentStep, setCurrentStep] = useState(0);
 const [nextStep, setNextStep] = useState(0);
 const [showExp, setShowExp] = useState(false);
 const [expText, setExpText] = useState("");
 const [progress, setProgress] = useState(0);
 const [isDisabled, setIsDisabled] = useState(true);
 const [progressYear, setProgressYear] = useState(0); // 0(start), 1(1), 2(5), 3(10), 4(50), 5(done)

 const scens = [
  {
   id: 1,
   year: 1,
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
   exp1:
    "You proceed with the expansion of the data centers. The company has more computational power, and you can scale your models to meet demand. However, the increased energy consumption will lead to higher carbon emissions, and the company’s environmental footprint will grow significantly. Additionally, you risk attracting negative publicity from environmental groups and activists.",
   exp2:
    "You delay the expansion of the data centers and invest heavily in transitioning to renewable energy sources, such as solar or wind, to power your existing infrastructure. While this might be more expensive in the short term, it will significantly reduce your carbon footprint over time and align the company with sustainability goals. However, this decision will delay product rollouts and potentially lose you some market share.",
  },
  {
   id: 2,
   year: 1,
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
   exp1:
    "You partner with established third-party providers who have highly efficient systems for collecting, processing, and storing data. These systems are state-of-the-art, but their data centers still rely on traditional power grids, which are mostly fueled by fossil energy. You get access to high-quality datasets quickly, but the environmental impact of sourcing these datasets is considerable.",
   exp2:
    "You build your own dataset infrastructure in-house, focusing on sustainable and eco-friendly practices. This requires significant upfront investment in green technologies, like energy-efficient servers and carbon-neutral cloud solutions. It will take longer to gather the necessary data, but you will have greater control over the sustainability of your operations.",
   link:
    "https://innodata.com/how-do-you-source-training-data-for-generative-ai/",
  },
  {
   id: 3,
   year: 1,
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
   exp1:
    "You go for maximum performance and accuracy, accepting the increased energy usage and environmental cost. The AI model will be highly accurate, but the environmental toll will be severe, as the training will require large-scale, energy-hungry computational operations. You'll also face criticism from environmental watchdogs for prioritizing performance over sustainability",
   exp2:
    "You optimize the model to reduce energy consumption, accepting a slight trade-off in performance. The model will require fewer computational resources, lowering your environmental impact. However, the slightly reduced performance might affect your market position, as customers may demand the most powerful models available.",
   link:
    "https://news.engin.umich.edu/2024/11/up-to-30-of-the-power-used-to-train-ai-is-wasted-heres-how-to-fix-it/",
  },
  {
   id: 4,
   year: 1,
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
   exp1:
    "You purchase hardware from well-established suppliers that offer lower costs, but their manufacturing processes are energy-intensive and have a significant environmental impact. This allows you to keep costs down in the short term, but it contributes to resource depletion and environmental damage.",
   exp2:
    "You source materials from manufacturers who prioritize sustainable practices, such as using recycled components or running their factories on renewable energy. While this increases upfront costs, it aligns your company with eco-friendly values and supports a greener supply chain.",
  },
  {
   id: 5,
   year: 5,
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
   exp1:
    "You release a series of ads across social media platforms to rehabilitate your company’s image and entice new users. The ads get mixed reviews; some think the ads are shallow if not paired with action and others are happy to see a large company addressing environmental issues at all, but ultimately the initial upset has cooled down.",
   exp2:
    "Environmentalists across social media are further upset by your company’s lack of response and care for the environment and advocate for government regulations, concerning your shareholders.",
  },
  {
   id: 6,
   year: 5,
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
   exp1:
    "You publicly acknowledged the energy problems present in AI. This has forced several companies to announce their intention to reduce their environmental impact. Your company is perceived as a leader in sustainability.",
   exp2:
    "You dismiss the environmental concerns and other companies at the conference feel comfortable doing the same.",
  },
  {
   id: 7,
   year: 5,
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
   exp1:
    "Partnering with Tesla has given your company access to lots of new resources. Unfortunately, your association with Musk has led to upset among consumers.",
   exp2:
    "You do not pair up with Elon Musk, citing the fact that he does not align with your company’s values. You regret the lack of resources but customers respect your company.",
   link:
    "https://www.forbes.com/sites/steveandriole/2023/11/15/chatbot-customer-service-not-the-way-comcastxfinity--or-most-companies--do-it/",
  },
  {
   id: 8,
   year: 5,
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
   exp1:
    "You develop a chatbot to guide users through your company’s website. Unfortunately, it was not received well by customers. Users report being confused by the chatbot and annoyed by its presence.",
   exp2:
    "You do not utilize chat bots as a tool to help customers, saving time, money, and energy.",
   link: "https://prospect.org/power/2024-06-17-elon-musk-decline-of-tesla/",
  },
  {
   id: 9,
   year: 5,
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
   exp1:
    "You purchase carbon credits to offset the company’s emissions. While this does provide a “green” image and supports projects that help reduce global emissions, it does not directly reduce your company’s own energy consumption or waste.",
   exp2:
    "You invest in reducing the company’s direct emissions by upgrading office buildings to more energy-efficient standards, transitioning to renewable energy for your data centers, and encouraging a remote work model. This approach has a longer-term impact but requires more effort and investment.",
   link:
    "https://interactive.carbonbrief.org/carbon-offsets-2023/companies.html",
  },
  {
   id: 10,
   year: 5,
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
   exp1:
    "You keep the company's culture centered on frequent in-person meetings and travel. This helps build team cohesion and innovation, but it leads to a higher carbon footprint due to frequent business travel and commuting.",
   exp2:
    "You opt to embrace a more flexible, remote-first work environment, cutting back on business travel to reduce your environmental footprint. While you’ll save on travel costs and reduce emissions, there may be challenges in maintaining company culture and collaboration.",
   link: "https://www.bls.gov/opub/btn/volume-13/remote-work-productivity.htm",
  },
  {
   id: 11,
   year: 10,
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
   exp1:
    "You decide to keep the design team. You continue paying them which is costly but they appreciate that you opted for human made work and produce some really innovative designs, prompting new customers to give our product a try",
   exp2:
    "You lay off the design team and get to work training your new AI to do their jobs. You find training the AI to your specifications to be a lot more energy intensive and costly than you had planned. Some consumers spot extra fingers in your design and start a hashtag to boycott your company for giving human jobs to AI.",
   link:
    "https://www.businessinsider.com/chinese-company-to-replace-some-copywriters-graphic-designers-ai-report-2023-4",
  },
  {
   id: 12,
   year: 10,
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
   exp1:
    "You keep the model exclusive and accessible only to high-value clients (e.g., large corporations, wealthy nations), who can afford to pay for the computational resources required to use it. This choice maximizes profits but limits the global accessibility and potential benefits of the AI model.",
   exp2:
    "You make the model available to a broader range of users, including smaller businesses and organizations in developing nations, potentially improving global access to AI-driven innovations. However, this decision would increase the computational load and environmental impact, as more clients will be using the model.",
   link:
    "https://hbr.org/2018/01/what-changes-when-ai-is-so-accessible-that-everyone-can-use-it",
  },
  {
   id: 13,
   year: 10,
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
   exp1:
    "You invest heavily in developing the AI tool, even though it's risky and costly. The potential environmental benefits are enormous, and this project could position your company as a leader in AI for sustainability. However, you are aware that the financial returns may take a long time to materialize, and there’s a chance the tool won’t work as intended.",
   exp2:
    "You put the climate-focused AI project on hold, focusing instead on more lucrative applications of AI in industries such as finance, healthcare, or retail. While this decision might bring in more money in the short term, it does little to address the global environmental crisis.",
   link:
    "https://www.bcg.com/publications/2024/ceos-achieving-ai-and-climate-goals?&utm_source=search&utm_medium=cpc&utm_campaign=climate&utm_description=paid&utm_topic=climate_sustainability&utm_geo=global&utm_content=search_climate_dsa_&gad_source=1&gclid=Cj0KCQiAr7C6BhDRARIsAOUKifj7uXjf4mAw88EBL8fSawD5WQ42CqkkPjIizne_zjuIX3Oi3JCmyHwaAhkTEALw_wcB&gclsrc=aw.ds",
  },
  {
   id: 14,
   year: 50,
   title: "Environmental Disaster",
   prompt:
    "A catastrophic environmental disaster has struck, leaving major parts of the world uninhabitable due to rising sea levels and toxic air pollution. Your company’s AI technologies are among the most advanced tools available to assist with relief and mitigation efforts, but deploying them at scale would drain the company's financial reserves. Alternatively, you could leverage your tech to create luxury havens for the wealthy, ensuring profit but limiting who you help.",
   c1: "Deploy AI for Global Relief Efforts",
   rE: 45,
   rM: -20,
   c2: "Focus on Luxury Solutions for Profit",
   rE2: -5,
   rM2: 10,
   next1: 20,
   next2: 18,
   exp1:
    "You direct your company’s resources toward creating AI systems for predicting natural disaster patterns, optimizing food distribution, and aiding in clean-up efforts. Your actions save millions of lives and earn global praise, but the company’s financial standing takes a severe hit. You may need to downsize in the coming years.",
   exp2:
    "You design AI-driven solutions exclusively for wealthy individuals and corporations, building profitable eco-bunkers and personalized disaster preparedness tools. Your company remains financially strong, but the public accuses you of abandoning societal responsibility in humanity's darkest hour.",
  },
  {
   id: 15,
   year: 50,
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
   exp1:
    "The infusion of capital saves the company from bankruptcy, but the investor repurposes your AI technology for surveillance and weaponization. Public trust in your company plummets, and employee morale is at an all-time low. However, financial stability gives you time to plan your next move.",
   exp2:
    "You implement widespread layoffs and discontinue several projects to save costs. The company survives but at great cost to your employees and reputation. While leaner, your company now has the agility to rebuild, but you'll need to address growing discontent internally and externally.",
   link:
    "https://www.washingtonpost.com/technology/2024/11/08/anthropic-meta-pentagon-military-openai/",
  },
  {
   id: 16,
   year: 50,
   title: "Environmental Utopia",
   prompt:
    "Decades of investment in sustainable AI applications have transformed the world into a near-utopia, with green energy and conservation at the forefront. Your company has been a key player in this transformation, but rivals are beginning to undermine your market share by offering cheap, less eco-conscious solutions. Do you double down on innovation or spend resources lobbying governments to enforce eco-friendly practices globally?",
   c1: "Invest in Green Innovation",
   rE: 20,
   rM: -5,
   c2: "Lobby for Government Regulations",
   rE2: 30,
   rM2: -10,
   next1: 20,
   next2: 20,
   exp1:
    "You allocate significant funds to create cutting-edge AI that further reduces waste and improves energy efficiency across industries. While expensive, your company strengthens its position as a global leader in sustainable technology, inspiring loyalty among eco-conscious consumers.",
   exp2:
    "You invest in lobbying efforts to pressure governments into adopting stricter environmental regulations. Your rivals are forced to comply, leveling the playing field. However, this sparks public backlash from those opposing increased government intervention and reduces your immediate market presence.",
  },
  {
   id: 17,
   year: 50,
   title: "Machines Replacing Humans",
   prompt:
    "Automation has taken over nearly all industries, leading to unprecedented economic efficiency but at a devastating environmental cost. The energy demands of running fully automated systems, powered by your AI technology, have escalated to unsustainable levels. Forests are being cleared to make way for data centers, and rare earth mining has destroyed ecosystems. Activists demand that your company scale back its operations and invest in eco-friendly infrastructure, but doing so would jeopardize your dominance in the AI industry. Alternatively, you could double down on current practices to maintain market supremacy, betting on future technological breakthroughs to solve the crisis.",
   c1: "Scale Back and Transition to Eco-Friendly Operations",
   rE: 5,
   rM: -15,
   c2: "Double Down on Expansion and Automation",
   rE2: -15,
   rM2: 20,
   next1: 18,
   next2: 15,
   exp1:
    "You pause expansion plans and invest heavily in renewable energy, energy-efficient algorithms, and sustainable sourcing for rare earth materials. While this reduces your company's short-term profitability and market share, it significantly decreases environmental harm and boosts public trust. Your reputation as a leader in ethical AI grows, but competitors may take advantage of your slower growth.",
   exp2:
    "You continue expanding at breakneck speed, ignoring environmental activists and relying on fossil fuels and intensive mining to meet energy demands. While this cements your position as the most powerful AI company in the world, ecosystems collapse further, and global warming accelerates. Governments and NGOs begin to push for sanctions and stricter environmental regulations, threatening long-term stability. Public opinion turns against you, branding your company a primary contributor to environmental devastation.",
  },
  {
   id: 18,
   title: "NEUTRAL ENDING",
   prompt:
    "Your company has achieved a degree of success, but it hasn’t come without compromise. In an effort to balance financial growth with environmental responsibility, you've made some tough decisions. While you've avoided catastrophic damage to the environment, you couldn't always prioritize sustainability over profits. The environment remains somewhat stable, but there are still areas where it could have been better. In the end, you’ve achieved a balance, though one that may have left some room for improvement.",
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
   prompt:
    "Your relentless pursuit of profit has led to catastrophic consequences. The decisions you made to maximize short-term financial gain have stripped the Earth of its resources. Air quality has plummeted, water sources have been depleted, and entire ecosystems are now on the brink of collapse. While your company has seen huge financial returns in the short term, the long-term cost to the planet is undeniable. The future of the planet is uncertain, and your company's success has come at a grave price.",
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
   prompt:
    "Through careful planning and a commitment to sustainable practices, your company has led the way in environmental protection. By prioritizing renewable energy, reducing waste, and adopting green technologies, you've not only built a profitable business but also contributed to the health of the planet. The environment is flourishing, biodiversity is rebounding, and your company's efforts have inspired others to follow suit. Your vision has created a legacy of sustainability for generations to come.",
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
   prompt:
    "In your unwavering commitment to preserving the environment, you have bankrupted your company. By choosing to allocate resources towards green initiatives, your company's finances have taken a severe hit. The decision to invest in the environment at the cost of profit was noble, but ultimately unsustainable. With no funds left to continue operations, your company has shut down. Though the Earth remains better off, your company's legacy is one of financial ruin. The harsh reality is that while the planet may thrive, a company can't survive without a solid financial foundation.",
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
 useEffect(() => {
  if (isDisabled) {
   const interval = setInterval(() => {
    setProgress((prevProgress) => {
     if (prevProgress < 100) {
      return prevProgress + 1;
     }
     clearInterval(interval);
     setIsDisabled(false);
     return 100;
    });
   }, 80);

   return () => clearInterval(interval);
  }
 }, [isDisabled]);

 const handleChoice = (choice) => {
  if (environment <= 0) {
   setCurrentStep(19);
   setEnvironment(0);
   setProgressYear(5);
  } else if (money <= 0) {
   setMoney(0);
   setCurrentStep(21);
   setProgressYear(5);
  }
  let newMoney = money;
  let newEnvironment = environment;
  let nextStep = currentStep;
  if (choice === "option1") {
   // c1, rE, rM, next1
   newMoney += scens[currentStep - 1].rM;
   newEnvironment += scens[currentStep - 1].rE;
   nextStep = scens[currentStep - 1].next1;
   setExpText(scens[currentStep - 1].exp1);
  } else if (choice === "option2") {
   // c2, rE2, rM2, next2
   newMoney += scens[currentStep - 1].rM2;
   newEnvironment += scens[currentStep - 1].rE2;
   nextStep = scens[currentStep - 1].next2;
   setExpText(scens[currentStep - 1].exp2);
  }
  setMoney(newMoney);
  setEnvironment(newEnvironment);
  if (environment <= 0) {
   setCurrentStep(19);
   setEnvironment(0);
   setProgressYear(5);
  } else if (money <= 0) {
   setMoney(0);
   setCurrentStep(21);
   setProgressYear(5);
  } else {
   setShowExp(true);
   setNextStep(nextStep);
   if (nextStep > 1 && nextStep < 5) {
    setProgressYear(1);
   } else if (nextStep < 11) {
    setProgressYear(2);
   } else if (nextStep < 14) {
    setProgressYear(3);
   } else if (nextStep >= 14) {
    setProgressYear(4);
   }
   setIsDisabled(true);
  }
 };
 const handleClick = () => {
  setProgress(0);
  setShowExp(false);
  setCurrentStep(nextStep);
 };
 const handleBegin = () => {
  setProgress(0);
  setCurrentStep(1);
  setProgressYear(1);
 };

 const restartGame = () => {
  setMoney(60);
  setEnvironment(60);
  setCurrentStep(0);
  setShowExp(false);
  setExpText("");
  setProgress(0);
  setIsDisabled(true);
  setProgressYear(0);
 };
 const renderGameStep = () => {
  if (showExp) {
   return (
    <div className="p-5">
     <h4 className="pixelify-sans-head">Impact of Your Decision...</h4>
     <p className="exp">{expText}</p>
     <button
      onClick={handleClick}
      disabled={isDisabled}
      style={{
       backgroundColor: isDisabled ? "#323232" : `#c3e7b8`,
       color: "#000",
       position: "relative",
       transition: "background-color 0.3s ease",
      }}
      className="btn button"
     >
      Continue
      <div
       style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: `${progress}%`,
        backgroundColor: "#c3e7b8",
        padding: "10px 20px",
        borderRadius: "25px",
        transition: "width 0.08s",
        opacity: "50%",
       }}
      />
     </button>
    </div>
   );
  }
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
      <p>Guide your company towards success!</p>
      <button className="btn button" onClick={handleBegin}>
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
      <p>
       {scens[currentStep - 1].year ? (
        <p>YEAR {scens[currentStep - 1].year}: </p>
       ) : (
        <div />
       )}
       {scens[currentStep - 1].prompt}
      </p>
      <button className="btn button" onClick={() => handleChoice("option1")}>
       {scens[currentStep - 1].c1}
      </button>
      <button className="btn button" onClick={() => handleChoice("option2")}>
       {scens[currentStep - 1].c2}
      </button>
      {/* link to more info... real world connection*/}
      <br />
      {scens[currentStep - 1].link ? (
       <a href={scens[currentStep - 1].link} target="_blank">
        <button className="btn button article">
         <FontAwesomeIcon
          className="article pr"
          fade
          icon={faMagnifyingGlass}
         />
         Read more
        </button>
       </a>
      ) : (
       <div />
      )}
     </div>
    );
   case 18:
    return (
     <div className="bg bg-neu p-5">
      <h3 className="pixelify-sans-head">Game Over!</h3>
      <h3 className="pixelify-sans-head color">
       {scens[currentStep - 1].title}
      </h3>
      <br />
      <p>{scens[currentStep - 1].prompt}</p>

      <button className="btn  button" onClick={restartGame}>
       Restart
      </button>
     </div>
    );
   case 19:
    return (
     <div className="bg bg-col p-5">
      <h3 className="pixelify-sans-head">Game Over!</h3>
      <h3 className="pixelify-sans-head color">
       {scens[currentStep - 1].title}
      </h3>
      <br />
      <p>{scens[currentStep - 1].prompt}</p>

      <button className="btn  button" onClick={restartGame}>
       Restart
      </button>
     </div>
    );
   case 20:
    return (
     <div className="bg bg-env p-5">
      <h3 className="pixelify-sans-head">Game Over!</h3>
      <h3 className="pixelify-sans-head color">
       {scens[currentStep - 1].title}
      </h3>
      <br />
      <p>{scens[currentStep - 1].prompt}</p>

      <button className="btn  button" onClick={restartGame}>
       Restart
      </button>
     </div>
    );
   case 21:
    return (
     <div className="bg bg-ban p-5">
      <h3 className="pixelify-sans-head">Game Over!</h3>
      <h3 className="pixelify-sans-head color">
       {scens[currentStep - 1].title}
      </h3>
      <br />
      <p>{scens[currentStep - 1].prompt}</p>

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
   <div className="year-out progress my-5 mx-4">
    <div
     className="year progress-bar progress-bar-animated"
     role="progressbar"
     style={{ width: `${progressYear * 20}%` }}
     aria-valuenow={progressYear * 20}
     aria-valuemin="0"
     aria-valuemax="100"
    ></div>
   </div>
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
