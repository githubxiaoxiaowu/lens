/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import type { DockTabCreate, DockTab, TabId } from "../dock/store";
import { TabKind } from "../dock/store";
import type { LogTabData } from "./tab-store";
import * as uuid from "uuid";
import { runInAction } from "mobx";
import createDockTabInjectable from "../dock/create-dock-tab.injectable";
import setLogTabDataInjectable from "./set-log-tab-data.injectable";

export type CreateLogsTabData = Pick<LogTabData, "owner" | "selectedPodId" | "selectedContainer" | "namespace"> & Omit<Partial<LogTabData>, "owner" | "selectedPodId" | "selectedContainer" | "namespace">;

interface Dependencies {
  createDockTab: (rawTabDesc: DockTabCreate, addNumber?: boolean) => DockTab;
  setLogTabData: (tabId: string, data: LogTabData) => void;
}

const createLogsTab = ({ createDockTab, setLogTabData }: Dependencies) => (title: string, data: CreateLogsTabData): TabId => {
  const id = `log-tab-${uuid.v4()}`;

  runInAction(() => {
    createDockTab({
      id,
      title,
      kind: TabKind.POD_LOGS,
    }, false);
    setLogTabData(id, {
      showTimestamps: false,
      showPrevious: false,
      ...data,
    });
  });

  return id;
};

const createLogsTabInjectable = getInjectable({
  id: "create-logs-tab",

  instantiate: (di) => createLogsTab({
    createDockTab: di.inject(createDockTabInjectable),
    setLogTabData: di.inject(setLogTabDataInjectable),
  }),
});

export default createLogsTabInjectable;
