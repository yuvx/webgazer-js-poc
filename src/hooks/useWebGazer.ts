import webgazer from "../lib/webgazer/index.mjs";
import { useCallback, useEffect, useRef, useState } from "react";

type BeginWebGazerOptions = {
  /**
   * 使用する回帰モジュール
   *
   * ridge(デフォルト) - 検出された目から画面上の位置にピクセルをマッピングする単純なリッジ回帰モデル。
   * weightedRidge - モデルに貢献する最新のユーザー インタラクションを備えた重みリッジ回帰モデル。
   * threadedRidge - スレッドを使用するリッジ回帰のより高速な実装。
   */
  regressionModule?: "ridge" | "weightedRidge" | "threadedRidge";
};

type UseWebGazerReturn = {
  begin: (options?: BeginWebGazerOptions) => Promise<void>;
  end: () => Promise<unknown>;
  clearData: () => Promise<unknown>;
  instance: typeof webgazer | undefined;
  state: {
    isStarted: boolean;
    gazePosition: {
      x: number;
      y: number;
    };
  };
};

export const useWebGazer: () => UseWebGazerReturn = () => {
  const instance = useRef<typeof webgazer>();
  const [isStarted, setIsStarted] = useState(false);
  const [gazePosition, setGazePosition] = useState<
    UseWebGazerReturn["state"]["gazePosition"]
  >({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    instance.current = webgazer;
  }, []);

  const begin = useCallback<UseWebGazerReturn["begin"]>((options) => {
    if (!instance.current) {
      throw new Error("WebGazer instance is falsy");
    }

    // 既に開始済みの場合は何もしない
    if (isStarted) return Promise.resolve();

    instance.current = instance.current.setGazeListener((data) => {
      if (!data) return;

      setGazePosition({
        x: data.x,
        y: data.y,
      });
    });

    instance.current = instance.current.showPredictionPoints(
      options?.regressionModule || "ridge"
    );

    return instance.current.begin().then(() => {
      setIsStarted(true);
    });
  }, []);

  const end = useCallback<UseWebGazerReturn["end"]>(() => {
    if (!instance.current) {
      throw new Error("WebGazer instance is falsy");
    }

    instance.current?.end();
    setIsStarted(false);

    return Promise.resolve();
  }, []);

  return {
    begin,
    end,
    clearData: () => instance.current!.clearData(),
    instance: instance.current,
    state: {
      isStarted,
      gazePosition,
    },
  };
};
