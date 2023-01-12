// var CanvasChart = React.createClass({
//
//     propTypes: {
//         width: React.PropTypes.number.isRequired,
//         height: React.PropTypes.number.isRequired,
//         colorBar: React.PropTypes.string,
//         animationSpeed: React.PropTypes.number,
//         staggerDelay: React.PropTypes.number,
//         hpadding: React.PropTypes.number,
//         rotation: React.PropTypes.number,
//         data: React.PropTypes.arrayOf(React.PropTypes.number)
//     },
//
//     componentDidMount: function () {
//         // Init CreateJS
//         var canvas = ReactDOM.findDOMNode(this.refs.canvas)
//         this.stage = new createjs.Stage(canvas);
//         createjs.Ticker.addEventListener('tick', this.stage);
//         createjs.Ticker.setFPS(45);
//
//
//         // Set Properties
//         this.canvasWidth = this.stage.canvas.width;
//         this.canvasHeight = this.stage.canvas.height;
//         this.color = this.props.colorBar || '#0000ff';
//         this.padding = this.props.hpadding || 1;
//         this.animationSpeed = this.props.animationSpeed || 300;
//         this.staggerDelay = this.props.staggerDelay || 20;
//         this.rotation = this.props.rotation || 0;
//
//
//         // Draw Chart first time
//         if (this.props.data) {
//             this.draw(this.props.data);
//         }
//
//     },
//
//     /**
//      * New Properties are received.
//      * Remove previous Chart and draw a new one
//      * @param nextProps
//      */
//     componentWillReceiveProps: function (nextProps) {
//         this.hidePreviousChart(nextProps.data);
//     },
//
//     /**
//      * Hide Current Chart with animations
//      */
//     hidePreviousChart: function (data) {
//
//         // Remove previous tween applied to the chart
//         createjs.Tween.removeTweens(this.group);
//
//         var _grp = this.group;
//         var _total = _grp.getNumChildren();
//
//         // Remove previous chart
//         for (var i = 0; i < _total; i++) {
//
//             // Get a single bar reference and remove previous tweens
//             var _bar = _grp.getChildAt(i);
//             createjs.Tween.removeTweens(_bar);
//
//             // Hide a Bar
//             createjs.Tween.get(_bar)
//                 .wait(i * this.staggerDelay)
//                 .to({
//                     y: this.canvasHeight,
//                     scaleX: 3,
//                     rotation: this.rotation
//                 }, this.animationSpeed, createjs.Ease.cubicInOut)
//                 .call(function(bar) {
//                     _grp.removeChild(bar)
//                 }.bind(this),[_bar]);
//         }
//
//         // Draw next chart after previous animation
//         var totalTime = this.animationSpeed + (_total * this.staggerDelay);
//         createjs.Tween.get(_grp)
//             .wait(totalTime)
//             .call(this.draw,[data]);
//
//     },
//
//     /**
//      * Draw a new chart
//      * @param data
//      */
//     draw: function (data) {
//
//         this.group = new createjs.Container();
//         this.stage.addChild(this.group);
//
//         // Total of bars
//         var _total = data.length;
//
//         // Bar width
//         var _barWidth = (this.canvasWidth / _total) - this.padding;
//
//         // Create and display bars
//         for (var i = 0; i < _total; i++) {
//
//             var _barHeight = this.canvasHeight * (data[i] / 100);
//
//             // Draw a Rectangle
//             var bar = new createjs.Graphics();
//             bar.beginFill(this.color);
//             bar.drawRect(0, 0, _barWidth, _barHeight);
//
//             // Show the Bar and set the position (x,y)
//             var barShape = new createjs.Shape(bar);
//             barShape.x = (_barWidth + this.padding) * i;
//             barShape.y = this.canvasHeight + _barHeight;
//             barShape.rotation = this.rotation;
//
//             // Add bar to this.stage
//             this.group.addChild(barShape);
//
//             // Show and animate the bar (with delay)
//             createjs.Tween.get(barShape)
//                 .wait(i * this.staggerDelay)
//                 .to({
//                     y: this.canvasHeight - _barHeight,
//                     rotation: 0
//                 }, 1000, createjs.Ease.cubicInOut);
//         }
//     },
//
//
//     /**
//      * Render Function
//      * @returns {XML}
//      */
//     render: function () {
//         return (
//             <canvas ref="canvas"
//                     width={this.props.width}
//                     height={this.props.height}></canvas>
//         );
//     }
//
//
// });
//
//
// /**
//  * App (main component)
//  * Render two <CanvasChart> components and generate random data
//  */
// var App = React.createClass({
//     // Initial state
//     getInitialState: function () {
//         return {chartData: []};
//     },
//     // Component Mount (init)
//     componentDidMount: function () {
//         this.updateData(10, 15, 30, 100);
//     },
//     // Generate random data
//     updateData(minBars, maxBars, minValue, maxValue) {
//         var elements = [];
//         // Random Total of Bars
//         var totalBars = this.random(minBars, maxBars);
//         for (var i = 0; i < totalBars; i++) {
//             elements.push(this.random(minValue, maxValue)); // Random Value
//         }
//         this.setState({
//             chartData: elements
//         })
//     },
//     // Random between numbers
//     random(min, max) {
//         return Math.floor(Math.random() * (max - min + 1) + min);
//     },
//     // render func
//     render: function () {
//
//         return <div>
//
//             <CanvasChart colorBar="#e68a00"
//                          width={500}
//                          height={300}
//                          animationSpeed={300}
//                          staggerDelay={100}
//                          hpadding={4}
//                          rotation={90}
//                          data={this.state.chartData}></CanvasChart>
//
//             <hr/>
//             <button className="btn btn-info"
//                     onClick={this.updateData.bind(this, 10, 50, 10, 100)}>
//                       Generate new data</button>
//         </div>
//
//     }
// });
//
// // I've seen a few of these BB-8 animations about, so I thought I'd take a shot at building one using React as a bit of an exercise. My favorite thing to do is draw circles around him to make him do a little jig, but I'm easily amused.
//
// class App2 extends React.Component {
//     constructor(props){
//         super(props);
//
//         this.state = {
//             droidX: 0,
//             mouseX: 0,
//             toTheRight: true,
//             speed: 2,
//             accelMod: 1
//         }
//     }
//
//     // Keep track of the mouse position.
//     handleMouseMove(event) {
//         this.setState({
//             mouseX: event.pageX
//         })
//     }
//
//     // Speed Mod Bar
//     handleSpeedChange(e) {
//         if(parseFloat(e.target.value)) {
//             this.setState({
//                 speed: e.target.value
//             })
//         }
//     }
//
//     // Acceleration Mod Bar
//     handleAccelChange(e) {
//         if(parseFloat(e.target.value)) {
//             this.setState({
//                 accelMod: e.target.value
//             })
//         }
//     }
//
//     // Get moving!
//     movement() {
//         let {droidX, mouseX, speed, accelMod} = this.state;
//
//         // Need a pretty strict if statement to make sure React doesn't end up in a
//         // render loop with all the state changes / re-rendering going on.
//         if(Math.abs(Math.round(droidX)-mouseX) !== 1){
//
//             let distance = mouseX - droidX;
//             let acceleration = Math.abs(distance * accelMod) / 100;
//
//             // Move to the right
//             if (droidX < mouseX) {
//                 this.setState({
//                     droidX: droidX+(speed*acceleration),
//                     toTheRight: true
//                 });
//             }
//
//             // Move to the left
//             else {
//                 this.setState({
//                     droidX: droidX-(speed*acceleration),
//                     toTheRight: false
//                 });
//             }
//         }
//     }
//
//     // Get some initial movement on first mount.
//     componentWillMount() {
//         this.setState({
//             mouseX: 300
//         });
//     }
//
//     // Set up the mouse event listener and fire up the movement function.
//     componentDidMount() {
//         document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
//         setInterval(this.movement.bind(this), 1);
//     }
//
//     // Clean up.
//     componentWillUnmount() {
//         document.removeEventListener('mousemove', (e) => this.handleMouseMove(e));
//     }
//
//     // Away we go.
//     render() {
//       let {speed, accelMod, droidX, mouseX, toTheRight} = this.state;
//
//       return (
//
//          <div>
//           <div className="bb8" style={{WebkitTransform: `translateX(${droidX}px)`}}>
//             <div className={'antennas ' + (toTheRight ? 'right' : '')}
//                  style={{WebkitTransform: `translateX(${(mouseX - droidX) / 25}px) rotateZ(${(mouseX - droidX) / 80 }deg)`}}>
//               <div className="antenna short"></div>
//               <div className="antenna long"></div>
//             </div>
//             <div className="head"
//                  style={{WebkitTransform: `translateX(${(mouseX - droidX) / 15}px) rotateZ(${(mouseX - droidX) / 25}deg)`}}>
//               <div className="stripe one"></div>
//               <div className="stripe two"></div>
//               <div className={'eyes ' + (toTheRight ? 'right' : '')}>
//                 <div className="eye one"></div>
//                 <div className="eye two"></div>
//               </div>
//               <div className={'stripe detail ' + (toTheRight ? 'right' : '')}>
//                 <div className="detail zero"></div>
//                 <div className="detail zero"></div>
//                 <div className="detail one"></div>
//                 <div className="detail two"></div>
//                 <div className="detail three"></div>
//                 <div className="detail four"></div>
//                 <div className="detail five"></div>
//                 <div className="detail five"></div>
//               </div>
//               <div className="stripe three"></div>
//             </div>
//             <div className="ball" style={{WebkitTransform: `rotateZ(${droidX / 2}deg)`}}>
//               <div className="lines one"></div>
//               <div className="lines two"></div>
//               <div className="ring one"></div>
//               <div className="ring two"></div>
//               <div className="ring three"></div>
//             </div>
//             <div className="shadow"></div>
//           </div>
//
//           <div className="instructions">
//             <p>move your mouse.</p>
//           </div>
//
//         </div>
//
//       );
//     }
// }
// class Sinus extends React.Component {
//   constructor() {
//         super();
//
//         this.state = {
//             degree: 0
//         };
//
//         setInterval(this._tick.bind(this), 30);
//     }
//     _tick() {
//       if(this.state.degree < 360) {
//         this.setState({degree: this.state.degree+1});
//       }else{
//         this.setState({degree: 0});
//       }
//     }
//     render() {
//       return (<SinusDraw degree={this.state.degree}/>);
//     }
//
// }
//
//   const SinusDraw = ({degree}) => (
//   <div id='container'>
//       <svg width='940' height='240' xmlns='http://www.w3.org/2000/svg' >
//         <g transform='translate(20 20)'>
//
//           <text x="0" y="100">
//               sin(
//           </text>
//
//           <line className='grey' x1={Math.cos(degree/180*Math.PI)*100 +  100+110} y1={-Math.sin(degree/180*Math.PI)*100 + 100}
//             x2={degree+460} y2={-Math.sin(degree/180*Math.PI)*100 + 100} />
//
//           <g transform='translate(110 0)'>
//             <line className='grey' x1="100" y1="100" x2="200" y2="100" />
//
//
//             <circle className='grey' cx="100" cy="100" r="100"/>
//             <path d={'M 130 100 A 30 30 0 ' +(degree <=180 ? '0': '1')+ ' 0' + (Math.cos(degree/180*Math.PI)*30 + 100) + ' ' + (-Math.sin(degree/180*Math.PI)*30 + 100)} />
//             <line className='grey' x1="100" y1="100" x2={Math.cos(degree/180*Math.PI)*100 + 100} y2={-Math.sin(degree/180*Math.PI)*100 + 100} />
//             <text x={Math.cos(degree/180*Math.PI)*100 + 100+10} y={-Math.sin(degree/180*Math.PI)*100 + 100}>
//               {degree}°
//             </text>
//           </g>
//
//           <text x="370" y="100">
//               ) =
//           </text>
//
//           <g transform='translate(460 0)'>
//             <line className='grey' x1="0" y1="100" x2="360" y2="100" />
//
//             <polyline className='grey'
//               points={Array.from({length: 360}, (value, key) => {
//                 return key + " " + (-Math.sin(key/180*Math.PI)*100 + 100)
//               })} />
//             <polyline
//               points={Array.from({length: degree}, (value, key) => {
//                 return key + " " + (-Math.sin(key/180*Math.PI)*100 + 100)
//               })} />
//             <text x={degree+10} y={-Math.sin(degree/180*Math.PI)*100 + 100}>
//               {parseFloat(Math.sin(degree/180*Math.PI)).toFixed(4)}
//             </text>
//           </g>
//         </g>
//       </svg>
//     </div>
// )
//
// // small circle radius
// const r1 = 5
// const r2 = 10
// const r3 = 15
// const width = window.innerWidth
// const height = window.innerHeight
//
// const minWH = Math.min(width, height)
//
// let maxSize
// if (minWH < 430) {
// 	maxSize = minWH - 30
// } else {
// 	maxSize = 400
// }
//
// // utils
// // deg to radian
// const rad = a => Math.PI * (a - 90) / 180
//
// // relative polar coordinates
// const rx = (r, a, c) => c + r * Math.cos(rad(a, c))
//
// const ry = (r, a, c) => c + r * Math.sin(rad(a))
//
// // get hours, minutes, and seconds
// const HMS = t => ({
// 	h: t.getHours(),
// 	m: t.getMinutes(),
// 	s: t.getSeconds()
// })
//
// const pathStringVars = (c, r, time) => {
// 	// center, radius and time = this.props
// 	// const {c,r,time} = p
// 	const {h, m, s} = HMS(time)
//
// 	// divide 360 deg by 12hrs, 60min, and 60s
// 	const hAngFact = 30
// 	const mAngFact = 6
// 	const sAngFact = 6
//
// 	// calc relative coordinates
// 	const hx = rx((r - 30), (hAngFact * h), c)
// 	const hy = ry((r - 30), (hAngFact * h), c)
// 	const mx = rx((r - 30), (mAngFact * m), c)
// 	const my = ry((r - 30), (mAngFact * m), c)
// 	const sx = rx((r - 30), (sAngFact * s), c)
// 	const sy = ry((r - 30), (sAngFact * s), c)
//
// 	return { hx, hy, mx, my, sx, sy }
// }
//
// const TextTime = ({ x, y, time }) => {
// 	const str = time.toTimeString().slice(0, 8).replace(/:/g, " : ")
// 	return (
// 		<text x={x} y={y} className='textTime'>
// 			{str}
// 		</text>
// 	)
// }
//
// // Circle component
// const Circle = ({cx, cy, r, cl}) => (
// 	<circle
// 		cx={cx}
// 		cy={cy}
// 		r={r}
// 		className={cl}
// 	/>
// )
//
// // Single spike
// const Spike = ({x1, x2, y1, y2}) => (
// 	<line
// 		className="spike"
// 		x1={x1}
// 		x2={x2}
// 		y1={y1}
// 		y2={y2}
// 	/>
// )
//
// const spikeNodes = (c, r) => {
// 	const increment = 30
// 	const nodes = []
//
// 	for(let i=1; i<13; i++) {
// 		let ang = i * increment
//
// 		let temp = (
// 			<Spike
// 				x1={rx(r-5, ang, c)}
// 				x2={rx((r-10), ang, c)}
// 				y1={ry(r-5, ang, c)}
// 				y2={ry((r-10), ang, c)}
// 				key={i}
// 			/>
// 		)
// 		nodes.push(temp)
// 	}
// 	return nodes
// }
//
// // populate Spikes
// const Spikes = ({c, r}) => (
// 	<g>
// 		{spikeNodes(c, r)}
// 	</g>
// )
//
// // triangle component
// const Triangle = ({c, r, time}) => {
// 	const {hx, hy, mx, my, sx, sy} = pathStringVars(c, r, time)
// 	const path = `M${hx},${hy} L${mx},${my} L${sx},${sy} L${hx},${hy}`
// 	return (
// 		<path
// 			className='triangle'
// 			d={path}
// 		/>
// 	)
// }
//
// // Secondary circles
// const SecCircle = ({c, r, time}) => {
// 	const {hx, hy, mx, my, sx, sy} = pathStringVars(c, r, time)
// 	return (
// 		<g>
// 			<Circle cl="secCircle" cx={hx} cy={hy} r={r3} />
// 			<Circle cl="secCircle" cx={mx} cy={my} r={r2} />
// 			<Circle cl="secCircle" cx={sx} cy={sy} r={r1} />
// 		</g>
// 	)
// }
//
// // main container
// class Clock extends React.Component {
// 	constructor() {
// 		super()
//
// 		this.state = {
// 			time: new Date()
// 		}
// 	}
//
//   render() {
//
// 		const size = maxSize
//
// 		const viewBox = `0 0 ${size} ${size}`
//
// 		const mid = size / 2
//
// 		const paddedRadius = (size - 30) / 2
//
// 		window.setTimeout(() => {
// 			this.setState({
// 				time: new Date()
// 			})
// 		}, 1000)
//
// 		return (
// 			<svg xmlns="http://www.w3.org/svg/2000"
// 					viewBox={viewBox}
// 					width={size}
// 					height={size}
// 				>
// 				<Circle
// 					cl="outerRing"
// 					cx={mid}
// 					cy={mid}
// 					r={mid - 5}
// 				/>
// 				<Circle
// 					cl="primCircle"
// 					cx={mid}
// 					cy={mid}
// 					r={mid - 15}
// 				/>
// 				<Spikes c={mid} r={paddedRadius} />
// 				<Triangle c={mid} r={paddedRadius} time={this.state.time} />
// 				<SecCircle c={mid} r={paddedRadius} time={this.state.time} />
// 				<TextTime
// 					time={this.state.time}
// 					x={mid}
// 					y={mid}
// 				/>
// 			</svg>
// 		)
//   }
// }
//
//
// var tabData = [
//   { name: 'Intro', isActive: true },
//   { name: 'Data', isActive: false },
//   { name: 'BB-8', isActive: false },
//   { name: 'Sine', isActive: false },
//   { name: 'Time', isActive: false }
// ];
// var Tabs = React.createClass({
//   render: function() {
//     return (
//       <ul className="nav nav-tabs">
//         {tabData.map(function(tab){
//           return (
//             <Tab data={tab} isActive={this.props.activeTab === tab} handleClick={this.props.changeTab.bind(this,tab)} />
//           );
//         }.bind(this))}
//       </ul>
//     );
//   }
// });
// var Tab = React.createClass({
//   render: function() {
//     return (
//       <li onClick={this.props.handleClick} className={this.props.isActive ? "active" : null}>
//         <a href="#">{this.props.data.name}</a>
//       </li>
//     );
//   }
// });
// var Content = React.createClass({
//   render: function() {
//     return (
//       <div>
//         {this.props.activeTab.name === 'Intro' ?
//         <section className="panel panel-success">
//           <h2 className="panel-heading">This is my test environment for react. Please go through the tabs to see the features.</h2>
//         </section>
//
//         :null}
//         {this.props.activeTab.name === 'Data' ?
//         <section className="panel panel-success">
//           <h2 className="panel-heading">I contain randomly generated data. Click the button to generate more random data.</h2>
//           <App/>
//         </section>
//         :null}
//         {this.props.activeTab.name === 'BB-8' ?
//         <section className="panel panel-success">
//           <h2 className="panel-heading">Meet BB-8. Move your mouse and he will follow...</h2>
//           <App2/>
//         </section>
//         :null}
//         {this.props.activeTab.name === 'Sine' ?
//         <section className="panel panel-success">
//           <h2 className="panel-heading">An active depiction of a Sine graph with its relative angle</h2>
//             <Sinus/>
//         </section>
//         :null}
//         {this.props.activeTab.name === 'Time' ?
//         <section className="panel panel-success">
//           <h2 className="panel-heading">A live clock just incase you forget Windows has one already</h2>
//             <Clock/>
//         </section>
//         :null}
//       </div>
//     );
//   }
// });
// var App3 = React.createClass({
//   getInitialState: function() {
//     return {
//       activeTab: tabData[0]
//     }
//   },
//   handleClick: function(tab) {
//     this.setState({activeTab: tab});
//   },
//   render: function() {
//     return (
//       <div>
//         <Tabs activeTab={this.state.activeTab} changeTab={this.handleClick} />
//         <Content activeTab={this.state.activeTab} />
//       </div>
//     );
//   }
// });
// ReactDOM.render(
//   <App3 />,
//   document.getElementById('TabTest')
// );