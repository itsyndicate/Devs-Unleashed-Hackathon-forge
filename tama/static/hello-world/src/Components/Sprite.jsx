class Sprite {
    constructor(contextRef,{position, imageSrc} ) {
        this.contextRef = contextRef
        this.position = position
        this.height = 150
        this.width = 30
        this.image = new Image()
        this.image.src = imageSrc
    }
    draw(){
        this.contextRef.current.drawImage(this.image, this.position.x, this.position.y)

    }
    update(){
        this.draw()
    }

}
export default Sprite;