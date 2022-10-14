export class CareerSerializer {
  static deSerializeCareer(data) {
    return {
      idCareer: data.idCareer,
      careerName: data.careerName,
      careerDescription: data.careerDescription,
      degree: data.degree,
      duration: data.duration,
      keywords: data.keywords,
      //careers: data.careers.map((car) => this.deSerializeCareer(car)),
    };
  }

  static deSerializeCareersNames(data) {
    return {
      idCareer: data.idCareer,
      careerName: data.careerName,
    };
  }
}
