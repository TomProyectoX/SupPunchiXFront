export default function StatCard({ title, value, unit, trend, borderColor = "border-gray-700" }) {
  const borderClass = borderColor === 'border-green-500' 
    ? 'border-green-500' 
    : borderColor === 'border-yellow-500'
    ? 'border-yellow-500'
    : borderColor === 'border-red-500'
    ? 'border-red-500'
    : 'border-gray-700';

  const unitColor = borderColor === 'border-green-500'
    ? 'text-[#CCFF00]'
    : borderColor === 'border-yellow-500'
    ? 'text-yellow-500'
    : 'text-red-500';

  return (
    <div className={`bg-[#0A0A0A] border-2 ${borderClass} rounded p-6`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-400 uppercase font-bold mb-3 tracking-wide">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-black text-white">
              {value}
            </h3>
            <span className={`text-xs font-bold uppercase tracking-wide ${unitColor}`}>
              {unit}
            </span>
          </div>
          {trend && (
            <p className="text-xs text-gray-500 mt-2 uppercase tracking-wide">
              {trend}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
