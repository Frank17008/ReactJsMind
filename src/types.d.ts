declare module '*.less' {
  const content: { [className: string]: string }
  export default content
}

// declare module 'jsmind' {
//   const jsMind: any
//   export default jsMind
// }

// declare module 'jsmind/draggable-node' {
//   const DraggableNode: any
//   export default DraggableNode
// }

declare module 'jsmind/style/jsmind.css' {
  const css: any
  export default css
}

// declare module 'dom-to-image' {
//   const domToImage: any
//   export default domToImage
// }