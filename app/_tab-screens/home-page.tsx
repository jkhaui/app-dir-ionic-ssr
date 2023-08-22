'use client';

import {
  AnimatePresenceWrapper,
  NotificationsIconButton,
  SegmentTabs,
  View,
} from '@/components';
import { ViewTypes } from '@/utils';
import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { InAppLink } from '@/components/in-app-link';
import { motion } from 'framer-motion';

export function HomePage({ screenId, searchParams }) {
  const router = useRouter();
  const [activeSegment, setActiveSegment] = React.useState('for-you');
  const [activeSegmentSecondary, setActiveSegmentSecondary] =
    React.useState('all');
  const handleActiveSegment = React.useCallback(
    (segment) => {
      setActiveSegment(segment);
      const params = new URLSearchParams();
      params.set(segment, true);

      router.push(screenId + '?' + params.toString());
    },
    [router, screenId]
  );

  const handleActiveSegmentSecondary = React.useCallback(
    (segment) => {
      setActiveSegmentSecondary(segment);
      const params = new URLSearchParams();
      params.set(segment, true);

      router.push(screenId + '?' + params.toString());
    },
    [router, screenId]
  );

  return (
    <View
      screenType={ViewTypes.TAB}
      screenId={screenId}
      NavBarEndSlot={
        <NotificationsIconButton
          component={InAppLink}
          href={'/notifications'}
        />
      }
      SecondaryNavBarSlot={
        <SegmentTabs
          scrollable={false}
          activeSegment={activeSegment}
          tabs={[
            { label: 'For You', value: 'for-you' },
            { label: 'Trending', value: 'trending' },
          ]}
          handleActiveSegment={(value) => handleActiveSegment(value)}
        />
      }
    >
      <SegmentTabs
        activeSegment={activeSegmentSecondary}
        tabs={[
          { label: 'All', value: 'all' },
          { label: 'News', value: 'news' },
          { label: 'Opinion', value: 'opinion' },
          { label: 'Sport', value: 'sport' },
          { label: 'Culture', value: 'culture' },
          { label: 'Lifestyle', value: 'lifestyle' },
        ]}
        handleActiveSegment={(value) => handleActiveSegmentSecondary(value)}
      />
      <AnimatePresenceWrapper>
        <motion.div
          key={activeSegment}
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 200, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 30,
          }}
        >
          {(activeSegment === 'for-you' || searchParams === 'for-you') && (
            <div className={'max-w-lg pb-16 pt-6'}>
              <div className='z-10 min-h-full w-full items-center justify-between pb-12 font-mono text-sm lg:flex lg:flex-col lg:items-center lg:justify-center'>
                <div className={'max-w-2xl'}>
                  <div className='mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left'>
                    <a
                      href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
                      className='group flex flex-col items-center justify-self-center rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <h2 className={`mb-3 self-start text-lg font-semibold`}>
                        Docs{' '}
                        <span className='inline-div transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
                          -&gt;
                        </span>
                      </h2>
                      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Find in-depth information about Next.js features and
                        API.
                      </p>
                    </a>
                    {/*<Popup*/}
                    {/*  opened={popupOpened}*/}
                    {/*  colors={{*/}
                    {/*    bg: 'bg-black opacity-50',*/}
                    {/*  }}*/}
                    {/*  size={'h-2/4 w-2/4'}*/}
                    {/*  onBackdropClick={() => setPopupOpened(false)}*/}
                    {/*>*/}
                    {/*  <View popup>*/}
                    {/*    <div>Te</div>*/}
                    {/*  </View>*/}
                    {/*</Popup>*/}
                    <a
                      href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
                      className='group flex flex-col items-center justify-self-center rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <h2 className={`mb-3 self-start text-lg font-semibold`}>
                        Learn{' '}
                        <span className='inline-div transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
                          -&gt;
                        </span>
                      </h2>
                      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Learn about Next.js in an interactive course
                        with&nbsp;quizzes!
                      </p>
                    </a>

                    <a
                      href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
                      className='group flex flex-col items-center justify-self-center rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <h2 className={`mb-3 self-start text-lg font-semibold`}>
                        Templates{' '}
                        <span className='inline-div transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
                          -&gt;
                        </span>
                      </h2>
                      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Explore the Next.js 13 playground.
                      </p>
                    </a>

                    <a
                      href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
                      className='group flex flex-col items-center justify-self-center rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <h2 className={`mb-3 self-start text-lg font-semibold`}>
                        Deploy{' '}
                        <span className='inline-div transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
                          -&gt;
                        </span>
                      </h2>
                      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Instantly deploy your Next.js site to a shareable URL
                        with Vercel.
                      </p>
                    </a>
                  </div>

                  {/*<div className='fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white py-16 dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none'>*/}
                  {/*  <div className="before:hrefgradient-radial relative z-[-1] flex place-items-center pr-2 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">*/}
                  {/*    <Image*/}
                  {/*      className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert'*/}
                  {/*      src='/next.svg'*/}
                  {/*      alt='Next.js Logo'*/}
                  {/*      width={180}*/}
                  {/*      height={37}*/}
                  {/*    />*/}
                  {/*  </div>*/}

                  {/*  <a*/}
                  {/*    className='pointer-events-none flex place-items-center gap-2 lg:pointer-events-auto lg:p-0'*/}
                  {/*    href='https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'*/}
                  {/*    target='_blank'*/}
                  {/*    rel='noopener noreferrer'*/}
                  {/*  >*/}
                  {/*    By{' '}*/}
                  {/*    <Image*/}
                  {/*      src='/vercel.svg'*/}
                  {/*      alt='Vercel Logo'*/}
                  {/*      className='dark:invert'*/}
                  {/*      width={100}*/}
                  {/*      height={24}*/}
                  {/*    />*/}
                  {/*  </a>*/}
                  {/*</div>*/}

                  <div className={'text-zinc-200'}>
                    <div>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </div>
                    <div>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </div>
                    <div>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </div>
                    <div>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </div>
                    <div>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </div>
                  </div>
                </div>
              </div>
              {/*<Fab*/}
              {/*  className='fixed left-1/2 z-20 -translate-x-1/2 transform bottom-4-safe'*/}
              {/*  icon={<PlusIcon className='h-6 w-6' />}*/}
              {/*  text={<span className={'text-lg'}>Create</span>}*/}
              {/*  textPosition='after'*/}
              {/*  touchRipple={false}*/}
              {/*  colors={{*/}
              {/*    textMaterial: 'text-white',*/}
              {/*  }}*/}
              {/*/>*/}
            </div>
          )}
          {(activeSegment === 'trending' || searchParams === 'trending') && (
            <div>
              <h1>TRENDING</h1>
            </div>
          )}
        </motion.div>
      </AnimatePresenceWrapper>
    </View>
  );
}