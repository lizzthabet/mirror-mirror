export const translateProportions = (width, height, sketchDimension) => {
	const area = width * height
	const videoProportion = area / (340 * 420)
	// this is the size of video feed which is outlined in styles
	return sketchDimension * videoProportion
}

export const findNewCenter = (coordinate, sketchDimension) => {
	const coordinateProportion = coordinate / 340
	const newCenter = Math.floor(
		sketchDimension * coordinateProportion - sketchDimension / 2
	)
	// edges will either be heights or widths of new gradient, depending on gradient direction
	let edge1 = Math.floor(sketchDimension / 2 + newCenter)
	let edge2 = Math.floor(sketchDimension / 2 + -newCenter)
	// edge cases (no pun intended) to prevent negative values
	if (edge1 < 0) edge1 = edge1 * -1
	if (edge2 < 0) edge2 = edge2 * -1
	// return the center point and either top/bottom or left/right dimensions
	return [newCenter, edge1, edge2]
}
