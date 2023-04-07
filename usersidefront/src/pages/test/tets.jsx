
  await getLeftover(,(data) => {
    if (data.propStatus === "not assigned") {
      const randomIndex = Math.floor(Math.random() * 15);
      setSubjectIndex(randomIndex);
      setSubject(subjects[randomIndex]);
      localStorage.setItem("subject", subject);
    } else {
      setSubject(localStorage.subject);
    }},
    (err) =>{
      console.log(err)
    })}
  

  const checkIsAssigned = async () => {
    await getLeftover(
      {
        date: todayString,
        userId: localStorage.userId,
      },
      (data) => {
        if (data.propStatus === "not assigned") {
          const randomIndex = Math.floor(Math.random() * 15);
      setSubjectIndex(randomIndex);
      setSubject(subjects[randomIndex]);
      localStorage.setItem("subject", subject);
        }
      }
    )
  }