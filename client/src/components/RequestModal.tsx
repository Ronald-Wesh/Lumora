import { useState } from 'react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { X } from 'lucide-react'
import { LogoMark } from '@/components/icons/LogoMark'
import { PillButton } from '@/components/PillButton'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function RequestModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('submitting')
    setError('')
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          project: data.get('project'),
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.message || 'Something went wrong.')
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  function handleOpenChange(next: boolean) {
    if (!next) {
      onClose()
      setTimeout(() => {
        setStatus('idle')
        setError('')
      }, 300)
    }
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-[110] flex items-end justify-center bg-foreground/30 p-4 backdrop-blur-lg transition-opacity duration-[550ms] ease-[cubic-bezier(.16,1,.3,1)] data-open:opacity-100 data-closed:opacity-0 sm:items-center" />
        <DialogPrimitive.Popup className="fixed inset-x-4 bottom-4 z-[110] mx-auto w-auto max-w-lg overflow-hidden rounded-card bg-white p-6 shadow-2xl ring-1 ring-line outline-none transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] data-open:translate-y-0 data-closed:translate-y-[18px] sm:inset-x-0 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:w-full sm:-translate-x-1/2 sm:-translate-y-1/2 sm:p-8 sm:data-closed:translate-y-[18px]">
          <DialogPrimitive.Close className="absolute right-4 top-4 grid size-9 place-items-center rounded-pill bg-surface text-foreground/60 transition-colors hover:bg-surface-2 hover:text-foreground">
            <X className="size-4" />
          </DialogPrimitive.Close>

          {status !== 'success' ? (
            <>
              <div className="mb-6 flex flex-col gap-1.5">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60">
                  <span className="size-1.5 rounded-pill bg-accent" />
                  Start a project
                </div>
                <DialogPrimitive.Title className="text-2xl font-semibold tracking-[-0.01em] sm:text-3xl">
                  Tell us what you&apos;re building.
                </DialogPrimitive.Title>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="f-name" className="mb-1.5 text-xs uppercase tracking-[0.025em] text-foreground/50">
                    Name
                  </Label>
                  <Input
                    id="f-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="h-auto rounded-control border-line bg-surface/50 px-4 py-3 text-sm focus-visible:border-foreground/30 focus-visible:bg-white focus-visible:ring-0"
                  />
                </div>
                <div>
                  <Label htmlFor="f-email" className="mb-1.5 text-xs uppercase tracking-[0.025em] text-foreground/50">
                    Email
                  </Label>
                  <Input
                    id="f-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="h-auto rounded-control border-line bg-surface/50 px-4 py-3 text-sm focus-visible:border-foreground/30 focus-visible:bg-white focus-visible:ring-0"
                  />
                </div>
                <div>
                  <Label htmlFor="f-project" className="mb-1.5 text-xs uppercase tracking-[0.025em] text-foreground/50">
                    Project
                  </Label>
                  <Textarea
                    id="f-project"
                    name="project"
                    rows={4}
                    required
                    placeholder="A few words about your project, timeline, and budget."
                    className="min-h-0 resize-none rounded-control border-line bg-surface/50 px-4 py-3 text-sm focus-visible:border-foreground/30 focus-visible:bg-white focus-visible:ring-0"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                <div className="mt-2 flex items-center justify-between gap-4">
                  <span className="text-xs text-foreground/45">We reply within one business day.</span>
                  <PillButton type="submit" variant="dark" arrow="up-right" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending…' : 'Send request'}
                  </PillButton>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="grid size-14 place-items-center rounded-pill bg-ink text-2xl text-accent-from">
                <LogoMark className="size-6" />
              </div>
              <DialogPrimitive.Title className="text-2xl font-semibold">
                Request received
              </DialogPrimitive.Title>
              <p className="max-w-[32ch] text-sm text-foreground/60">
                Thanks for reaching out — we&apos;ll get back to you within one business day.
              </p>
              <PillButton variant="dark" onClick={() => handleOpenChange(false)}>
                Close
              </PillButton>
            </div>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
