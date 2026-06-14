import type { CrosshairParams } from '@/data/crosshairs'

interface Props {
  params: CrosshairParams
  svgSize?: number
}

export default function CrosshairSVG({ params, svgSize = 100 }: Props) {
  const { size, gap, thickness, dot, tStyle, color, outline, outlineThickness, alpha } = params
  const opacity = alpha / 255
  const cx = 50
  const cy = 50

  const arms = [
    // right
    { x: cx + gap, y: cy - thickness / 2, width: size, height: thickness },
    // left
    { x: cx - gap - size, y: cy - thickness / 2, width: size, height: thickness },
    // bottom
    { x: cx - thickness / 2, y: cy + gap, width: thickness, height: size },
    // top (skipped in T-style)
    ...(!tStyle ? [{ x: cx - thickness / 2, y: cy - gap - size, width: thickness, height: size }] : []),
  ]

  return (
    <svg
      width={svgSize}
      height={svgSize}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" fill="#1a1a1a" />

      {outline &&
        arms.map((arm, i) => (
          <rect
            key={`outline-${i}`}
            x={arm.x - outlineThickness}
            y={arm.y - outlineThickness}
            width={arm.width + outlineThickness * 2}
            height={arm.height + outlineThickness * 2}
            fill="#000000"
            opacity={opacity}
          />
        ))}

      {arms.map((arm, i) => (
        <rect
          key={`arm-${i}`}
          x={arm.x}
          y={arm.y}
          width={arm.width}
          height={arm.height}
          fill={color}
          opacity={opacity}
        />
      ))}

      {dot && (
        <>
          {outline && (
            <circle
              cx={cx}
              cy={cy}
              r={thickness / 2 + outlineThickness}
              fill="#000000"
              opacity={opacity}
            />
          )}
          <circle cx={cx} cy={cy} r={thickness / 2} fill={color} opacity={opacity} />
        </>
      )}
    </svg>
  )
}
