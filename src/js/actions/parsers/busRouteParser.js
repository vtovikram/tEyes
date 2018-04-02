export const getVechileCoordinatesObject = (vechileData) => {
  return vechileData.map((vechile)=>{
    return {
      'id': vechile.id,
      'coordinates': [vechile.lon, vechile.lat]
    };
  });
}
