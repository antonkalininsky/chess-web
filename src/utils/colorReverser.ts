export default function colorReverser (color: string): string {
	if (color === 'w') {
		return 'b'
	} else if (color === 'b') {
		return 'w'
	}
	return ''
}