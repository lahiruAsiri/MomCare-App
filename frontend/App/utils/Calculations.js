export const calculateCurrentWeek = (pregnancyStartDate) => {
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - pregnancyStartDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return Math.min(Math.floor(diffDays / 7) + 1, 40);
  };
  
  export const calculateDeliveryCountdown = (pregnancyStartDate) => {
    const deliveryDate = new Date(pregnancyStartDate.getTime());
    deliveryDate.setDate(deliveryDate.getDate() + 280); // 40 weeks
    
    const now = new Date();
    const difference = deliveryDate - now;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
  };