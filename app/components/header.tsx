'use client'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { CSSProperties, Fragment, ReactNode, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

const CATEGORIES = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature']
const STATUS = [
  { color: '#F49F85', label: 'Planned' },
  { color: '#AD1FEA', label: 'In-Progress' },
  { color: '#62BCFA', label: 'Live' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header
      className="sticky top-0 flex w-full items-center justify-between px-6 py-4"
      style={{
        background: 'radial-gradient(128.88% 128.88% at 103.9% -10.39%, #E84D70 0%, #A337F6 53.09%, #28A7ED 100%)',
      }}
    >
      <div className="flex flex-col">
        <h1 className="text-base font-bold text-white">Frontend Mentor</h1>
        <h2 className="text-sm font-medium text-white/75">Feedback Board</h2>
      </div>

      <button onClick={() => setIsOpen(true)}>
        <Image src="/icon-hamburger.svg" alt="" width={20} height={17} className="h-[17px]" />
      </button>

      {/* modify --header-height if header height changes */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        style={
          {
            '--header-height': '76px',
          } as CSSProperties
        }
      >
        {({ open }) => {
          return (
            <>
              <div className="fixed inset-0 top-[var(--header-height)] bg-black/30" aria-hidden="true" />
              <Dialog.Panel
                className={clsx(
                  'fixed right-0 top-[var(--header-height)] z-10 flex h-[calc(100vh_-_var(--header-height))] w-72 animate-slide-in flex-col gap-6 bg-ghost-white p-6 transition-transform duration-1000',
                )}
              >
                <PanelSection>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((category) => (
                      <button key={category} className="rounded-md bg-cotton-ball px-4 py-1 text-sm font-semibold ">
                        {category}
                      </button>
                    ))}
                  </div>
                </PanelSection>
                <PanelSection>
                  <div className="flex flex-col gap-6">
                    <div className="flex items-baseline justify-between">
                      <strong className="text-lg font-bold text-jewel-cave">Roadmap</strong>
                      <Link href="/" className="text-sm font-semibold text-rainbow-fish underline">
                        View
                      </Link>
                    </div>
                    <ul className="flex flex-col gap-2">
                      {STATUS.map((s) => (
                        <li key={s.label} className="flex justify-between">
                          <span
                            style={
                              {
                                '--before-color': s.color,
                              } as CSSProperties
                            }
                            className="flex items-center gap-4 text-ocean-night before:block before:h-2 before:w-2 before:rounded-full before:bg-[var(--before-color)]"
                          >
                            {s.label}
                          </span>
                          <span className="font-bold text-ocean-night">2</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </PanelSection>
              </Dialog.Panel>
            </>
          )
        }}
      </Dialog>
    </header>
  )
}

function PanelSection({ children }: { children: ReactNode }) {
  return <section className="rounded-lg bg-white px-6 pb-9 pt-6 ">{children}</section>
}
