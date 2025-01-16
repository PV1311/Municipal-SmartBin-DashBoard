import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SmartBin } from '../types/bin';

interface DashboardProps {
  bins: SmartBin[];
}

export default function Dashboard({ bins }: DashboardProps) {
  const areaStats = bins.reduce((acc: any, bin) => {
    if (!acc[bin.location.area]) {
      acc[bin.location.area] = {
        area: bin.location.area,
        avgFillLevel: 0,
        binCount: 0,
      };
    }
    acc[bin.location.area].avgFillLevel += bin.fillLevel;
    acc[bin.location.area].binCount += 1;
    return acc;
  }, {});

  Object.values(areaStats).forEach((stat: any) => {
    stat.avgFillLevel = Math.round(stat.avgFillLevel / stat.binCount);
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Area Statistics</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={Object.values(areaStats)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="area" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avgFillLevel" fill="#3B82F6" name="Average Fill Level (%)"barSize={100} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}