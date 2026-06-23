import { Link } from 'react-router-dom';
import { ReadingDescent } from '../../components/ReadingDescent';
import { PostChrome } from '../components/PostChrome';
import { Prose } from '../components/Prose';
import { AtomicLinkDiagram } from './AtomicLinkDiagram';
import { OaeLogo } from './OaeLogo';

// Bespoke explainer post for Open Atomic Ethernet — the foundational "what is it"
// piece. Draws on the project's design concepts (atomicity on the wire, two-way
// link semantics, reversibility, perfect information feedback, clock-from-
// interaction) in plain language. Deliberately concept-only: no company/product
// internals, no unverified business claims.
export function WhatIsOae() {
  return (
    <article className="mx-auto max-w-2xl px-6 pt-28 pb-24">
      <ReadingDescent />

      <div className="mx-auto mb-2 w-2/3 max-w-[320px]">
        <OaeLogo priority />
      </div>

      <PostChrome
        projectSlug="open-atomic-ethernet"
        projectTitle="Open Atomic Ethernet"
        title="What is Open Atomic Ethernet?"
        date="2025-08-15"
      />

      <div className="mt-12">
        <Prose>
          <p>
            Every distributed system eventually hits the same wall: you sent a message,
            and you don't know what happened to it. No acknowledgment came back. Was the
            message lost? Did it arrive and the acknowledgment got lost on the way home?
            You can't tell, and that single ambiguity is the seed of almost all the
            complexity in distributed computing. Timeouts, retries, deduplication,
            idempotency keys, consensus protocols: most of that machinery exists to paper
            over the fact that the network won't give you a straight answer.
          </p>

          <p>
            <strong>Open Atomic Ethernet (OAE)</strong> is a link-layer protocol that
            deterministically delivers. Every message is an atomic transaction: it
            either <em>commits</em> and both sides know it arrived and agree it's final, or
            it <em>rolls back</em>, leaving no trace on the receiver and only a record of
            the attempt on the sender. There is no third state. The "it might have
            arrived" that haunts every other network simply doesn't exist, because OAE stops information loss at the level it actually occurs -- Layer 2: Ethernet.
          </p>

          <h2>One state machine, not two</h2>

          <p>
            The trick is to stop treating a link as two endpoints shouting across a gap.
            In a conventional link, each side runs its own state machine and they stay in
            sync by exchanging messages — which means they can drift apart the moment a
            packet is lost. OAE collapses the two into one: a single state machine that
            spans the link, carried inside the packets themselves. The two ends of an
            atomic link can't hold contradictory views of what happened — the same way two
            entangled particles can't. There's only one shared state, and it lives on the
            wire.
          </p>

          <AtomicLinkDiagram />

          <h2>Reversibility and perfect information</h2>

          <p>
            Two ideas make that work. The first is <em>reversibility</em>. Borrowing from
            reversible computation — where any step can be run backward without losing
            information — an OAE link keeps enough state to cleanly unwind a failed
            transaction. A bit error or a dropped packet doesn't leave a half-applied
            update sitting on the receiver; the link runs backward to the last agreed
            state, and you try again. Recovery is deterministic, not a heuristic.
          </p>

          <p>
            The second is <strong>perfect information feedback</strong>: every packet
            carries the sender's view of the other side's state, so neither end ever has
            to guess. The feedback path is constant and exact — not a heartbeat you sit and
            wait on, and not a timeout standing in for knowledge you don't have.
          </p>

          <h2>A clock you don't need</h2>

          <p>
            Notice what's missing: a clock. OAE doesn't lean on NTP, PTP, or any shared
            notion of time. Ordering and progress come from the alternating pattern of the
            exchange itself — each confirmed round-trip is a tick. The "clock" is derived
            from interaction, not stamped on from outside. That deletes a whole class of
            failure modes at once: no clock skew, no drift, no leap-second accounting, and
            no waiting on a timeout that was only ever a guess about how long is too long.
          </p>

          <h2>The firing-squad test</h2>

          <p>
            A good way to test whether a fabric can really coordinate is the Firing Squad
            Synchronization Problem: get a chain of nodes to act at the same instant, with
            no global clock. If you can't make a chain fire together, you can't make a
            database agree either. We built exactly that on OAE — a line of nodes
            converging on a simultaneous FIRE, surviving cut cables and reordered nodes —
            and wrote it up{' '}
            <Link to="/projects/open-atomic-ethernet/fms-firing-squad">separately</Link>.
          </p>

          <h2>Why push it into the network</h2>

          <p>
            Put atomicity down in the link layer and a lot of the machinery above it gets
            smaller. Distributed databases spend enormous effort reaching consensus over an
            unreliable channel; if the channel itself delivers exactly-once, ordered,
            all-or-nothing messages, the consensus on top can be simpler and faster. The
            same holds for storage, for ML collective communication, for anything where a
            silent corruption or a long tail-latency stall is unacceptable. The bet behind
            OAE is that the right place to solve coordination is the wire — and that
            "atomic, reversible, clock-free" is a better foundation than "best-effort and
            hope."
          </p>

          <p>
            It's early. The reference implementation runs on a small cluster wired over
            Thunderbolt, and plenty of the harder questions — extending two-party atomicity
            to many parties, putting the whole thing in silicon — are still open. But the
            core idea has held up under every demo I've thrown at it: make the wire tell the
            truth, and most of distributed systems gets easier.
          </p>
        </Prose>
      </div>

      <div className="mt-20 border-t border-glow/10 pt-10">
        <Link
          to="/projects/open-atomic-ethernet"
          className="group inline-flex items-center gap-2 rounded-full border border-glow/30 px-5 py-2.5 font-sans text-sm text-glow/90 transition-colors hover:border-glow/60 hover:bg-glow/10 hover:text-glow"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          Open Atomic Ethernet
        </Link>
      </div>
    </article>
  );
}
