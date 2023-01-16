const gravity = 0.7
class Fighter {
    constructor(contextRef,{position, velocity, color = 'yellow', offset, name, imageSrc, health}, ) {
        this.contextRef = contextRef
        this.position = position
        this.velocity = velocity
        this.height = 229
        this.width = 322
        this.lastKey = ''
        this.hitBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: this.width + 100,
            height: 50,
        }
        this.color = color
        this.isAttacking = false
        this.health = health
        this.dead = true
        this.name = name
        this.image = new Image()
        this.image.src = imageSrc
    }
    draw(){
        // draw player
        this.contextRef.current.drawImage(this.image, this.position.x, this.position.y)

        // name
        this.contextRef.current.font = 'bold 38px montserrat'

        this.contextRef.current.fillStyle = this.color
        this.contextRef.current.fillText(this.name, this.position.x + 120 , this.position.y -  10)

        // hitbox
        if (this.isAttacking){
            this.contextRef.current.fillStyle = 'green'
            this.contextRef.current.fillRect(this.hitBox.position.x,this.hitBox.position.y, this.hitBox.width, this.hitBox.height )
        }
    }
    update(){
        this.draw()
        this.hitBox.position.x = this.position.x + this.hitBox.offset.x
        this.hitBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= 541){
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }
    attack(){
        this.isAttacking = true
        setTimeout( ()=>{
            this.isAttacking = false
        }, 100)
    }
}
export default Fighter;