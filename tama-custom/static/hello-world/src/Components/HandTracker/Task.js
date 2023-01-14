class Task{
  constructor(imageSrc, handWidth, taskCoordinates) {
    this.handWidth = handWidth
    this.width = 150
    this.isTaskTaken = false
    this.image = new Image()
    this.image.src = imageSrc
    this.difference_between_centers ={
      x: 0,
      y: 0,
    }
    this.taskCoordinates = {
      x: taskCoordinates.x,
      y: taskCoordinates.y
    }
  }
  setIsTaskTaken(taskCenter,handCenter){
    let distance = Math.sqrt(Math.pow(taskCenter.x - handCenter.x, 2) + Math.pow(taskCenter.y - handCenter.y, 2)) - 800
    // console.log(distance )
    return this.isTaskTaken = distance <= this.handWidth / 2 + this.width / 2;
  }
}
export default Task