export default params;
declare namespace params {
  const moveTickSize: number;
  const videoContainerId: string;
  const videoElementId: string;
  const videoElementCanvasId: string;
  const faceOverlayId: string;
  const faceFeedbackBoxId: string;
  const gazeDotId: string;
  const videoViewerWidth: number;
  const videoViewerHeight: number;
  const faceFeedbackBoxRatio: number;
  const showVideo: boolean;
  const mirrorVideo: boolean;
  const showFaceOverlay: boolean;
  const showFaceFeedbackBox: boolean;
  const showGazeDot: boolean;
  namespace camConstraints {
    namespace video {
      namespace width {
        const min: number;
        const ideal: number;
        const max: number;
      }
      namespace height {
        const min_1: number;
        export { min_1 as min };
        const ideal_1: number;
        export { ideal_1 as ideal };
        const max_1: number;
        export { max_1 as max };
      }
      const facingMode: string;
    }
  }
  const dataTimestep: number;
  const showVideoPreview: boolean;
  const applyKalmanFilter: boolean;
  const saveDataAcrossSessions: boolean;
  const storingPoints: boolean;
}
