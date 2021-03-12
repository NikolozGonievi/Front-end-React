export function getCars(){
    const cars = JSON.parse(localStorage.getItem('cars')) || []
    return cars
 }

 export function addCar(car){
    const cars = getCars()
    const carArray = [...cars, car]
    localStorage.setItem('cars', JSON.stringify(carArray))
}

export function removeCar(index){
    const cars = getCars()
    delete cars[index]
    localStorage.setItem('Cars', JSON.stringify(cars))
  }
  export function changeCar(id, car){
    const cars = getCars()
    cars[id] = car
    
    localStorage.setItem('Cars', JSON.stringify(car))
    return cars;
  }