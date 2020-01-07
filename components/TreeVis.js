import React from 'react'
import { hierarchy, tree } from 'd3-hierarchy'
import * as d3 from 'd3'
import Box from './Box'

const createTree = data => {
  const root = hierarchy(data)
  root.dx = 12
  root.dy = 400 / (root.height + 1)
  return tree().nodeSize([root.dx, root.dy])(root)
}

const drawTree = data => {
  const root = createTree(data)
  let x0 = Infinity
  let x1 = -x0
  root.each(d => {
    if (d.x > x1) x1 = d.x
    if (d.x < x0) x0 = d.x
  })

  let y0 = Infinity
  let y1 = -y0
  root.each(d => {
    if (d.y > y1) y1 = d.y
    if (d.y < y0) y0 = d.y
  })

  const svg = d3
    .create('svg')
    .attr('viewBox', [0, 0, y1 - y0 + root.dy * 2, x1 - x0 + root.dx * 2])

  const g = svg
    .append('g')
    .attr('font-size', 7)
    .attr('transform', `translate(${root.dy / 3 + 55},${root.dx - x0})`)

  g.append('g')
    .attr('fill', 'none')
    .attr('stroke', '#357edd')
    .attr('stroke-opacity', 1)
    .attr('stroke-width', 1)
    .selectAll('path')
    .data(root.links())
    .join('path')
    .attr(
      'd',
      d3
        .linkHorizontal()
        .x(d => d.y)
        .y(d => d.x)
    )

  const node = g
    .append('g')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-width', 3)
    .selectAll('g')
    .data(root.descendants())
    .join('g')
    .attr('transform', d => `translate(${d.y},${d.x})`)

  node
    .append('text')
    .attr('dy', '0.31em')
    .attr('text-anchor', d => (d.children ? 'end' : 'start'))
    .text(d => d.data.name)
    .clone(true)
    .lower()
    .attr('stroke', 'white')
  return { __html: svg.node().outerHTML }
}

const TreeVis = ({ tree }) => {
  return <Box>{tree && <Box dangerouslySetInnerHTML={drawTree(tree)} />}</Box>
}

export default TreeVis
