import provinces from 'china-division/dist/provinces.json';
import cities from 'china-division/dist/cities.json';
import areas from 'china-division/dist/areas.json';

let dists = {}
dists['provinceData'] = []
dists['cityData'] = {}
dists['areaData'] = {}

// areas.forEach((area) => {
// //   const matchCity = cities.filter(city => city.code === area.cityCode)[0];
// //   if (matchCity) {
// //     matchCity.children = matchCity.children || [];
// //     matchCity.children.push({
// //       label: area.name,
// //       value: area.name,
// //     });
// //   }
// // });





provinces.forEach((province) => {
  dists['provinceData'].push(province.name)
  dists['cityData'][province.name] = []
})


cities.forEach((city) => {
  const matchProvince = provinces.filter(province => province.code === city.provinceCode)[0];
  dists['areaData'][city.name]=[]
  //dists['areaData'][city.name].push('全部区域')

  if (matchProvince) {
    dists['cityData'][matchProvince['name']].push(city.name)
  }

});

areas.forEach((area) => {
  const matchCity = cities.filter(city => city.code === area.cityCode)[0];

  if (matchCity) {

    dists['areaData'][matchCity['name']].push(area.name)
  }
})


export default dists;
