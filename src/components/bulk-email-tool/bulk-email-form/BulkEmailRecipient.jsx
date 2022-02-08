import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';

const DEFAULT_GROUPS = {
  SELF: 'myself',
  STAFF: 'staff',
  ALL_LEARNERS: 'learners',
  VERIFIED: 'track:verified',
  AUDIT: 'track:audit',
};

export default function BulkEmailRecipient(props) {
  const { handleCheckboxes, selectedGroups, additionalCohorts } = props;
  return (
    <Form.Group>
      <Form.Label>
        <FormattedMessage
          id="bulk.email.form.recipients.sendLabel"
          defaultMessage="Send To:"
          description="A label before the list of potential recipients"
        />
      </Form.Label>
      <Form.CheckboxSet
        name="recipientGroups"
        className="w-75 flex-wrap flex-row justify-content-between"
        onChange={handleCheckboxes}
        value={selectedGroups}
      >
        <Form.Checkbox key="myself" value="myself" className="mt-2.5">
          <FormattedMessage
            id="bulk.email.form.recipients.myself"
            defaultMessage="Myself"
            description="A selectable choice from a list of potential email recipients"
          />
        </Form.Checkbox>
        <Form.Checkbox key="staff" value="staff">
          <FormattedMessage
            id="bulk.email.form.recipients.staff"
            defaultMessage="Staff/Administrators"
            description="A selectable choice from a list of potential email recipients"
          />
        </Form.Checkbox>
        <Form.Checkbox
          key="track:audit"
          value="track:audit"
          disabled={selectedGroups.find((group) => group === DEFAULT_GROUPS.ALL_LEARNERS)}
        >
          <FormattedMessage
            id="bulk.email.form.recipients.audit"
            defaultMessage="Learners in the audit track"
            description="A selectable choice from a list of potential email recipients"
          />
        </Form.Checkbox>
        <Form.Checkbox
          key="track:verified"
          value="track:verified"
          disabled={selectedGroups.find((group) => group === DEFAULT_GROUPS.ALL_LEARNERS)}
        >
          <FormattedMessage
            id="bulk.email.form.recipients.verified"
            defaultMessage="Learners in the verified certificate track"
            description="A selectable choice from a list of potential email recipients"
          />
        </Form.Checkbox>
        <Form.Checkbox
          key="learners"
          value="learners"
          disabled={selectedGroups.find((group) => group === (DEFAULT_GROUPS.AUDIT || DEFAULT_GROUPS.VERIFIED))}
        >
          <FormattedMessage
            id="bulk.email.form.recipients.learners"
            defaultMessage="All Learners"
            description="A selectable choice from a list of potential email recipients"
          />
        </Form.Checkbox>
        {
          // additional cohorts
          additionalCohorts
            && additionalCohorts.map((cohort) => (
              <Form.Checkbox
                key={cohort}
                value={`cohort:${cohort}`}
              >
                <FormattedMessage
                  id="bulk.email.form.cohort.label"
                  defaultMessage="Cohort: {cohort}"
                  values={{ cohort }}
                />
              </Form.Checkbox>
            ))
        }
      </Form.CheckboxSet>
      {!props.isValid && (
        <Form.Control.Feedback className="px-3" hasIcon type="invalid">
          <FormattedMessage
            id="bulk.email.form.recipients.error"
            defaultMessage="At least one recipient is required"
            description="An Error message located under the recipients list. Visible only on failure"
          />
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}

BulkEmailRecipient.defaultProps = {
  isValid: true,
  additionalCohorts: [],
};

BulkEmailRecipient.propTypes = {
  selectedGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleCheckboxes: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  additionalCohorts: PropTypes.arrayOf(PropTypes.string),
};