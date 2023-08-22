'use client'

import * as React from 'react';
import {mapSecondaryRoutesToView} from '@/secondary-routes-config';
import {useInAppNavigation} from "@/hooks";
import {getScreenId} from "@/utils";

export default function Page({params}) {
    return mapSecondaryRoutesToView(getScreenId(params))
}
