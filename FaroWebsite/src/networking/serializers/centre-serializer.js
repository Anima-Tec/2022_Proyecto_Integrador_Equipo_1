export class CentreSerializer {
  static deSerializeCentre(data) {
    return {
      idCentre: data.idCentre,
      centreName: data.centreName,
      free: data.free,
      addressNumber: data.addressNumber,
      latitude: data.latitude,
      longitude: data.longitude,
      centreSchedules: data.centreSchedules,
      schoolarLevel: data.schoolarLevel,
      addressStreet: data.addressStreet,
      phoneNumber: data.phoneNumber,
      careers: data.careers
        ? data.careers.map((car) => this.deSerializeCareer(car))
        : [],
    }
  }

  static deSerializeCareer(data) {
    return {
      idCareer: data.idCareer,
      careerName: data.careerName,
      careerDescription: data.careerDescription,
      degree: data.degree,
      duration: data.duration,
      keywords: data.keywords,
    }
  }

  static deSerializeCentreCoordinates(data) {
    return {
      idCentre: data.idCentre,
      centreName: data.centreName,
      latitude: data.latitude,
      longitude: data.longitude,
    }
  }

  static deSerializeCentresName(data) {
    return {
      idCentre: data.idCentre,
      centreName: data.centreName,
    }
  }
}
