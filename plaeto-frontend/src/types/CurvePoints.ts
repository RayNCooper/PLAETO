interface CurveData {
  curveNumber: number;
  curvePoints: CurvePoint[];
}

interface CurvePoint {
  sequenceNumber: number;
  voltage: number;
  microAmperage: number;
}

export { CurveData, CurvePoint };
