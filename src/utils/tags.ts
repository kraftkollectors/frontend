const tags = {
    user: "user",
    artisan: "artisan",
    userCertificates: "user_certificates",
    userEducation: "user_education",
    myServices: "myServices",
    mySingleFav: (userId:string, serviceId:string)=> `${userId}-fav-${serviceId}`,
    chats: (userId:string, guestId:string)=> `${userId}-chat-${guestId}`,
    chatHeads: (userId:string)=> `${userId}-chat`,
    myFavs: (userId:string)=> `${userId}-fav`,
    serviceReviews: (serviceId:string)=> `reviews-${serviceId}`,
}


export default tags;