import { Link } from 'react-router-dom';
import { ReadingDescent } from '../../components/ReadingDescent';
import { PostChrome } from '../components/PostChrome';
import { Prose } from '../components/Prose';
import { FiringSquadDemo } from './FiringSquadDemo';
import demoPhoto from './assets/demo-photo.jpg';

// Bespoke post #1 of Open Atomic Ethernet: the Flash Memory Summit "firing squad"
// demo writeup. Hand-built layout — photo hero, prose from the original writeup,
// and the FiringSquadDemo visual dropped mid-article where the live demo was.
export function FmsFiringSquad() {
  return (
    <article className="mx-auto max-w-2xl px-6 pt-28 pb-24">
      <ReadingDescent />

      <div className="w-full overflow-hidden rounded-sm">
        <img
          src={demoPhoto}
          alt="The Open Atomic Ethernet emulator on the show floor at Flash Memory Summit"
          className="w-full object-cover"
          style={{ maxHeight: '480px', objectPosition: 'center' }}
        />
      </div>

      <div className="mt-6">
        <PostChrome
          projectSlug="open-atomic-ethernet"
          projectTitle="Open Atomic Ethernet"
          title="A Firing Squad at Flash Memory Summit"
          date="2025-10-27"
        />
      </div>

      <div className="mt-12">
        <Prose>
          <p>
            At Flash Memory Summit we live-demoed a distributed{' '}
            <em>firing squad</em> synchronization on our Open Atomic Ethernet (OAE)
            emulator. A single StreamDeck press triggered a wave of local handshakes
            across a chain of links, each node exchanging reversible messages and
            acknowledgments until the entire system converged on a simultaneous{' '}
            <strong>FIRE</strong> without any shared global clock. On the display,
            attendees watched cells change state as readiness tokens pulsed through the
            network, then saw us inject faults — pulling cables, reorganizing nodes in
            the chain — only to have the system self-heal and still deliver a clean,
            coordinated commit.
          </p>

          <FiringSquadDemo />

          <p>
            Under the hood, the classic Firing Squad Synchronization Problem is realized
            using OAE's two-way link semantics and Perfect Information Feedback (PIF).
            Every message slice advances only on confirmed causal exchange; the echo
            path forms a dynamical <em>clock</em> derived from interaction rather than
            timestamps. When the final consensus token completes its round-trip, all
            participants hold identical causal knowledge and execute FIRE within a
            bounded skew set by that last echo. The result is a deterministic,
            barrier-style commit: <strong>either everyone fires together, or no one
            does.</strong>
          </p>

          <p>
            In a datacenter, the value of that <em>firing squad</em> moment is the
            guarantee. When a fabric can produce a simultaneous action without relying on
            a fragile, globally trusted clock, you unlock a different class of
            coordination: barrier commits that either complete everywhere or nowhere;
            reconfigurations that flip atomically across thousands of endpoints; and
            state transitions whose skew is bounded by a round-trip echo rather than by
            NTP/PTP quirkiness, drift, or leap-second accounting. That's what our demo is
            really showing: a way to turn local, reversible handshakes into a
            deterministic, fabric-level commit.
          </p>

          <p>
            Concretely, this kind of synchronization makes routine but painful operations
            safer and faster. Rolling upgrades and feature flags can cut over on an
            identical causal tick, so you don't see half the fleet on old behavior while
            the other half races ahead. Cache invalidations, epoch bumps, and schema/ABI
            flips can execute as a single, fabric-wide edge — no gray window where writers
            and readers disagree. Distributed databases gain crisp, low-variance
            consistency points for snapshots and log truncation. Stream processors and ML
            pipelines can checkpoint, rotate segments, or switch models in lockstep,
            reducing tail-latency spikes that come from staggered pauses. Even power and
            thermal management benefit: coordinated power capping or workload shedding
            applied simultaneously across a rack avoids the oscillations you get from
            independent local controllers reacting out of phase.
          </p>

          <p>
            The takeaway is that synchrony emerges from local rules and return-path
            confirmation, aligning with our Alternating Causality model and mapping
            cleanly to hardware emulation. The same handshake and echo mechanics sit
            comfortably next to PHYs on Thunderbolt/PCIe lanes or switch fabrics, offering
            a practical primitive for robust, clock-free coordination in next-generation
            memory and interconnect stacks.
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
