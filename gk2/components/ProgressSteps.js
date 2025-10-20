// components/ProgressSteps.js
import React from 'react';
import { View, Text } from 'react-native';
import { g, colors } from '../styles/styles';

const STEPS = ['Sport', 'Venue', 'Book'];

function currentIndexFromProp(current) {
  if (typeof current === 'number') return Math.min(Math.max(current, 0), STEPS.length - 1);
  const map = { sport: 0, venue: 1, book: 2 };
  return map[String(current || '').toLowerCase()] ?? 0;
}

export default function ProgressSteps({ current = 'sport', style }) {
  const idx = currentIndexFromProp(current);

  return (
    <View style={[g.progressWrap, style]}>
      <View style={g.progressRow}>
        {STEPS.map((label, i) => {
          const status = i < idx ? 'done' : i === idx ? 'active' : 'todo';
          const circleStyle = [
            g.stepCircle,
            status === 'active' && g.stepCircleActive,
            status === 'done' && g.stepCircleDone,
          ];
          const labelStyle = [
            g.stepLabel,
            status === 'active' && g.stepLabelActive,
            status === 'done' && g.stepLabelDone,
          ];

          return (
            <View key={label} style={g.stepItem}>
              <View style={circleStyle}>
                <Text style={g.stepNumber}>
                  {status === 'done' ? '✓' : i + 1}
                </Text>
              </View>
              <Text style={labelStyle}>{label}</Text>

              {/* connector (ikke efter sidste) */}
              {i < STEPS.length - 1 && (
                <View
                  style={[
                    g.connector,
                    (status === 'done' || (status === 'active' && idx > i)) && g.connectorActive,
                  ]}
                />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}