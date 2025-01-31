/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import type { Injectable } from "@ogre-tools/injectable";

export const getGlobalOverride = <T extends Injectable<any, any, any>>(
  injectable: T,
  overridingInstantiate: T["instantiate"],
) => ({
    injectable,
    overridingInstantiate,
  });
